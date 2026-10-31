import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const marker = '<!-- ORIGINAL_REFERENCE -->';
const failures = [];
function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : entry.name.endsWith('.md') ? [full] : [];
  });
}
function mainText(file) {
  return fs.readFileSync(file, 'utf8').split(marker)[0];
}
function blocks(file, language) {
  return [...mainText(path.join(root, file)).matchAll(/^~~~([^\r\n]*)\r?\n([\s\S]*?)^~~~\s*$/gm)]
    .filter(match => match[1].trim() === language)
    .map(match => match[2]);
}
function prose(markdown) {
  return markdown.replace(/^~~~[^\r\n]*\r?\n[\s\S]*?^~~~\s*$/gm, '');
}
function anchors(markdown) {
  const ids = [...markdown.matchAll(/<a id="([^"]+)"/g)].map(match => match[1]);
  const used = new Map();
  for (const heading of markdown.matchAll(/^#{1,6} (.+)$/gm)) {
    const base = heading[1].replace(/<[^>]*>/g, '').toLowerCase()
      .replace(/[^\p{L}\p{N}\p{M}_\-\s]/gu, '').replace(/\s/g, '-');
    const count = used.get(base) ?? 0;
    ids.push(count ? base + '-' + count : base);
    used.set(base, count + 1);
  }
  return new Set(ids);
}

const files = walk(root);
let archived = 0;
let links = 0;
let syntaxChecks = 0;
for (const file of files) {
  const relative = path.relative(root, file);
  const full = fs.readFileSync(file, 'utf8');
  const main = mainText(file);
  if (full.includes(marker)) {
    archived++;
    if (!/^# .*[\u0600-\u06ff]/mu.test(main)) failures.push(relative + ': missing Persian title');
    if (!main.includes('<summary>')) failures.push(relative + ': missing exercise answer');
    if (full.split(marker).length !== 2) failures.push(relative + ': repeated archive');
  }
  const fences = [...main.matchAll(/^~~~/gm)].length;
  if (fences % 2 !== 0) failures.push(relative + ': unclosed code fence');
  if ((full.match(/<details>/g) ?? []).length !== (full.match(/<\/details>/g) ?? []).length) {
    failures.push(relative + ': unbalanced details');
  }
  if (main.includes('§') || main.includes('\ufffd')) failures.push(relative + ': encoding or draft placeholder');
  if (/^# .*[\u0600-\u06ff]/mu.test(main)) {
    if (!full.startsWith('<div dir="rtl" align="right">\n\n')) failures.push(relative + ': missing RTL container');
    if (!full.endsWith('\n\n</div>\n')) failures.push(relative + ': missing RTL closing tag');
    for (const match of main.matchAll(/^~~~[^\n]*\n[\s\S]*?^~~~\s*$/gm)) {
      if (!main.slice(0, match.index).trimEnd().endsWith('<div dir="ltr" align="left">')) {
        failures.push(relative + ': code fence without LTR container');
      }
    }
    if (['README.md', 'ROADMAP.md'].includes(relative)) {
      if (/^(?:- |\d+\. )/m.test(main)) failures.push(relative + ': list without explicit item direction');
      for (const tag of main.matchAll(/<(?:ul|ol|li)\b[^>]*>/g)) {
        if (!tag[0].includes('dir="rtl"')) failures.push(relative + ': list direction missing');
      }
    }
  }
  const explicitIds = [...main.matchAll(/<a id="([^"]+)"/g)].map(match => match[1]);
  if (new Set(explicitIds).size !== explicitIds.length) failures.push(relative + ': duplicate HTML anchors');
  for (const match of prose(main).matchAll(/\[[^\]]*\]\(([^)\s]+)\)|<a [^>]*href="([^"]+)"/g)) {
    const href = match[1] ?? match[2];
    if (/^[a-z][a-z\d+.-]*:/i.test(href)) continue;
    links++;
    const [target, fragment] = href.split('#');
    const destination = target ? path.resolve(path.dirname(file), decodeURIComponent(target)) : file;
    if (!fs.existsSync(destination)) {
      failures.push(relative + ': missing link ' + href);
    } else if (fragment && destination.endsWith('.md')) {
      const ids = anchors(fs.readFileSync(destination, 'utf8'));
      if (!ids.has(decodeURIComponent(fragment))) failures.push(relative + ': missing anchor ' + href);
    }
  }
  for (const code of blocks(relative, 'js')) {
    const check = spawnSync(process.execPath, ['--check', '--input-type=module'], {
      input: code, encoding: 'utf8', timeout: 10_000,
    });
    syntaxChecks++;
    if (check.status !== 0) failures.push(relative + ': JS syntax: ' + (check.stderr || check.error));
  }
}

// Run the actual code blocks, with captured output and bounded timer cleanup.
async function example(file, index, expected, { after = '', delay = 10, error } = {}) {
  const code = blocks(file, 'js')[index];
  assert.ok(code !== undefined, 'Missing example: ' + file + ' #' + index);
  const output = [];
  const timers = new Set();
  const context = vm.createContext({
    console: { log: (...values) => output.push(Array.from(values)) },
    setTimeout: (callback, ms) => {
      const timer = setTimeout(() => { timers.delete(timer); callback(); }, ms);
      timers.add(timer);
      return timer;
    },
    clearTimeout: timer => { clearTimeout(timer); timers.delete(timer); },
    queueMicrotask,
  });
  try {
    try {
      vm.runInContext(code + '\n' + after, context, { timeout: 1000 });
      if (error) assert.fail('Expected ' + error);
    } catch (caught) {
      if (!error || caught.name !== error) throw caught;
    }
    await new Promise(resolve => setTimeout(resolve, delay));
    assert.deepEqual(JSON.parse(JSON.stringify(output)), expected);
  } finally {
    for (const timer of timers) clearTimeout(timer);
  }
}

const cases = [
  ['01-javascript/fundamentals.md', 0, [[10], [20]]],
  ['01-javascript/fundamentals.md', 1, [['Ali'], [true]]],
  ['01-javascript/fundamentals.md', 2, [['Mina']]],
  ['01-javascript/fundamentals.md', 3, [[24], [25], [false]]],
  ['01-javascript/fundamentals.md', 4, [['Shiraz']]],
  ['01-javascript/fundamentals.md', 6, [[true], [false], [false], [false], [true], [false]]],
  ['01-javascript/fundamentals.md', 7, [[[90, 180]]]],
  ['01-javascript/fundamentals.md', 8, [[[1, 2]]]],
  ['01-javascript/scope-closure-hoisting.md', 0, [['Shop', 'Sara']]],
  ['01-javascript/scope-closure-hoisting.md', 1, [['global']]],
  ['01-javascript/scope-closure-hoisting.md', 5, [['hello']]],
  ['01-javascript/scope-closure-hoisting.md', 6, [[1], [2], [1]]],
  ['01-javascript/scope-closure-hoisting.md', 7, [[80], [200]]],
  ['01-javascript/scope-closure-hoisting.md', 8, [[3], [3], [3]]],
  ['01-javascript/execution-context.md', 0, [[9]]],
  ['01-javascript/execution-context.md', 1, [['Hello Sara'], ['Hello Ali']]],
  ['01-javascript/execution-context.md', 2, [[3], [2], [1]]],
  ['01-javascript/event-loop.md', 0, [['A'], ['D'], ['C'], ['B']]],
  ['01-javascript/event-loop.md', 1, [[1], [2], [3]]],
  ['01-javascript/event-loop.md', 2, [['start'], ['inside-before'], ['end'], ['inside-after']]],
  ['01-javascript/event-loop.md', 3, [[1], [4], [3], [2]]],
  ['01-javascript/this-and-functions.md', 0, [['Sara']]],
  ['01-javascript/this-and-functions.md', 2, [['Hi Ali!'], ['Hi Ali!'], ['Hello Ali?']]],
  ['01-javascript/this-and-functions.md', 3, [[3]]],
  ['01-javascript/this-and-functions.md', 4, [['Sara']]],
  ['01-javascript/this-and-functions.md', 5, [['Frontend']]],
  ['01-javascript/prototype-and-classes.md', 0, [['Hi Sara'], [false]]],
  ['01-javascript/prototype-and-classes.md', 1, [['red'], ['blue']]],
  ['01-javascript/prototype-and-classes.md', 2, [['Hi Sara'], [true], [true]]],
  ['12-algorithms/big-o.md', 0, [[9]]],
  ['12-algorithms/big-o.md', 1, [[9]]],
  ['12-algorithms/arrays-strings-map-set.md', 0, [[[1, 2, 3]], [2]]],
  ['12-algorithms/arrays-strings-map-set.md', 1, [[2]]],
  ['12-algorithms/stack-queue-recursion.md', 0, [['type B'], ['type A']]],
  ['12-algorithms/stack-queue-recursion.md', 1, [[24]]],
  ['12-algorithms/searching-sorting-patterns.md', 0, [[3], [-1]]],
  ['12-algorithms/trees-and-graphs.md', 0, [['A'], ['B'], ['D'], ['C']]],
  ['12-algorithms/frontend-coding-exercises.md', 0, [['react']], { delay: 60 }],
  ['12-algorithms/frontend-coding-exercises.md', 1, [[['A', 'B']]]],
  ['interview/coding-problems.md', 0, [[[0, 1]], [[0, 1]]]],
  ['interview/coding-problems.md', 1, [[true], [false], [true]]],
  ['interview/javascript-questions.md', 0, [[2]]],
  ['interview/javascript-questions.md', 1, [['start'], ['end'], ['promise'], ['timer']]],
  ['01-javascript/scope-closure-hoisting.md', 4, [], { error: 'ReferenceError' }],
  ['12-algorithms/searching-sorting-patterns.md', 0, [[3], [-1], [0], [-1], [-1]], {
    after: 'console.log(binarySearch([5], 5)); console.log(binarySearch([5], 2)); console.log(binarySearch([1, 3], 9));',
  }],
  ['interview/coding-problems.md', 0, [[[0, 1]], [[0, 1]], [null], [null], [[0, 1]]], {
    after: 'console.log(twoSum([], 0)); console.log(twoSum([3], 6)); console.log(twoSum([-1, 2, 7], 1));',
  }],
  ['interview/coding-problems.md', 1, [[true], [false], [true], [false], [false], [false], [true]], {
    after: "console.log(validBrackets('(')); console.log(validBrackets(')')); console.log(validBrackets('a')); console.log(validBrackets('{}[]'));",
  }],
  ['12-algorithms/frontend-coding-exercises.md', 1, [[[]], [['A', 'B']], ['rejected']], {
    after: "allArray([]).then(console.log); allArray([Promise.reject(new Error('bad'))]).catch(() => console.log('rejected'));",
  }],
  ['12-algorithms/frontend-coding-exercises.md', 0, [], {
    after: 'search.cancel();', delay: 60,
  }],
];
for (const args of cases) {
  try { await example(...args); }
  catch (error) { failures.push(args[0] + ' example #' + args[1] + ': ' + error.message); }
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(files.length + ' Markdown files; ' + archived + ' Persian lessons with preserved archives.');
  console.log(links + ' local links and ' + syntaxChecks + ' JS syntax checks passed.');
  console.log(cases.length + ' executable example output checks passed.');
}
