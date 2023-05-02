const { sortPages } = require('./report.js');
const { test, expect } = require('@jest/globals');

test('sortPages', () => {
  const pages = {
    'https://wagslane.dev/path2': 3,
    'https://wagslane.dev/path3': 5,
  };

  const actual = sortPages(pages);
  const expected = [
    ['https://wagslane.dev/path3', 5],
    ['https://wagslane.dev/path2', 3],
  ];
  expect(actual).toEqual(expected);
});
