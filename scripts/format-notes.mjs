import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const marker = '<!-- ORIGINAL_REFERENCE -->';
const rtl = '<div dir="rtl" align="right">';
const ltr = '<div dir="ltr" align="left">';
const span = value => '<span dir="ltr">' + value + '</span>';

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : entry.name.endsWith('.md') ? [full] : [];
  });
}

function inlineDirection(line) {
  const saved = [];
  const protect = value => {
    saved.push(value);
    return '\ue000' + (saved.length - 1) + '\ue001';
  };
  // Remove only the spans this formatter creates, so a second run is unchanged.
  line = line.replace(/<span dir="ltr">([\s\S]*?)<\/span>/g, '$1');
  // URLs and HTML attributes must never be rewritten as visible prose.
  line = line.replace(/(\]\()([^\s)]+)(\))/g, (_, start, href, end) =>
    start + protect(href) + end);
  line = line.replace(/<[^>]*>/g, protect);
  line = line.replace(/(\x60+)([^\x60]*?)\1/g, (code, _fence, content) =>
    protect(/[A-Za-z0-9]/.test(content) ? span(code) : code));
  line = line.replace(
    /[A-Za-z][A-Za-z0-9_]*(?:(?:[./:+#-]|[ \t]+(?=[A-Za-z0-9]))[A-Za-z0-9_]+)*/g,
    span,
  );
  return line.replace(/\ue000(\d+)\ue001/g, (_, index) => saved[Number(index)]);
}

function formatMain(main) {
  // Unwrap our previous code containers, while retaining the exact fence body.
  main = main.replace(
    /<div dir="ltr"(?: align="left")?>\n\n((?<fence>~{3,}|\x60{3,})[^\n]*\n[\s\S]*?\n\k<fence>)\n\n<\/div>/g,
    '$1',
  );
  const output = [];
  let fence;
  for (const line of main.trimEnd().split('\n')) {
    const match = line.match(/^(~{3,}|\x60{3,})(.*)$/);
    if (!fence && match) {
      fence = match[1];
      output.push(ltr, '', line);
    } else if (fence) {
      output.push(line);
      if (line.trim() === fence) {
        output.push('', '</div>');
        fence = undefined;
      }
    } else {
      output.push(inlineDirection(line));
    }
  }
  if (fence) throw new Error('Unclosed code fence');
  return output.join('\n');
}

function directionLists(main) {
  // GitHub may auto-detect a different direction for items starting in English.
  // Give the list AND every item an explicit base direction.
  const inlineHtml = value => value
    .replace(/(\x60+)([^\x60]*?)\1/g, (_, _fence, code) =>
      '<code>' + code.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;') + '</code>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return main.replace(/^(?:- |\d+\. ).+(?:\n(?:- |\d+\. ).+)*/gm, block => {
    const ordered = /^\d/.test(block);
    const tag = ordered ? 'ol' : 'ul';
    const start = ordered ? Number(block.match(/^\d+/)[0]) : 1;
    return '<' + tag + ' dir="rtl" align="right"' + (start !== 1 ? ' start="' + start + '"' : '') + '>\n'
      + block.split('\n').map(line => '<li dir="rtl">' + inlineHtml(line.replace(/^(?:- |\d+\. )/, '')) + '</li>').join('\n')
      + '\n</' + tag + '>';
  });
}

let count = 0;
for (const file of walk(root)) {
  let content = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  if (!/^# .*[\u0600-\u06ff]/m.test(content.split(marker)[0])) continue;
  const previousRoot = content.match(/^<div dir="rtl"(?: align="right")?>\n\n/);
  if (previousRoot) {
    content = content.slice(previousRoot[0].length);
    if (!content.endsWith('\n\n</div>\n')) throw new Error('Missing RTL end: ' + file);
    content = content.slice(0, -'\n\n</div>\n'.length);
  }
  const parts = content.split(marker);
  let formatted = formatMain(parts[0]);
  if (['README.md', 'ROADMAP.md'].includes(path.relative(root, file))) {
    formatted = directionLists(formatted);
  }
  if (parts.length === 2) {
    const archive = parts[1];
    const summaryEnd = archive.indexOf('</summary>') + '</summary>'.length;
    const detailsEnd = archive.lastIndexOf('</details>');
    if (summaryEnd < '</summary>'.length || detailsEnd < summaryEnd) {
      throw new Error('Invalid archive: ' + file);
    }
    let original = archive.slice(summaryEnd, detailsEnd).trim();
    const previousArchive = original.match(/^<div dir="ltr"(?: align="left")?>\n\n/);
    if (previousArchive && original.endsWith('\n\n</div>')) {
      original = original.slice(previousArchive[0].length, -'\n\n</div>'.length);
    }
    formatted += '\n\n' + marker + archive.slice(0, summaryEnd)
      + '\n\n' + ltr + '\n\n' + original + '\n\n</div>\n\n</details>';
  } else if (parts.length !== 1) {
    throw new Error('Repeated archive: ' + file);
  }
  fs.writeFileSync(file, rtl + '\n\n' + formatted + '\n\n</div>\n', 'utf8');
  count++;
}
console.log('Formatted ' + count + ' Persian Markdown documents.');
