const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeURL strip protocol', () => {
  const input = 'https://blog.boot.dev/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL strip trailing slash', () => {
  const input = 'https://blog.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL lowerCase', () => {
  const input = 'https://blog.BOOT.dev/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL strip http', () => {
  const input = 'http://blog.BOOT.dev/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML absolute url', () => {
  const inputHTMLBody = `
 <html>
 <body>
 <a href="https://blog.boot.dev/path">
    Blog for boot.dev
</a>
 </body>
 </html>`;

  const inputBaseURL = 'https://blog.boot.dev/path';
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ['https://blog.boot.dev/path'];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative url', () => {
  const inputHTMLBody = `
 <html>
 <body>
 <a href="/path/">
    Blog for boot.dev
</a>
 </body>
 </html>`;

  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ['https://blog.boot.dev/path/'];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative and absolute url', () => {
  const inputHTMLBody = `
 <html>
 <body>
 <a href="/path1/">
    Blog for boot.dev
</a>
 <a href="https://blog.boot.dev/path2/">
    Blog for boot.dev path 2
</a>
 </body>
 </html>`;

  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    'https://blog.boot.dev/path1/',
    'https://blog.boot.dev/path2/',
  ];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML invalid url', () => {
  const inputHTMLBody = `
 <html>
 <body>
 <a href="invalid">
   Invalid url 
 </body>
 </html>`;

  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
