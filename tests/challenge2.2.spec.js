const fn = require('../challenge2.2');

describe('flattenMap with cumulated key', () => {
  const cases = [
    [[{a: 1}], {a: 1}],
    [[{a: 1, b: 2}], {a: 1, b: 2}],
    [[{a: 1, b: null}], {a: 1, b: null}],
    [[{a: 1, b: {c: 3}}], {'a': 1, 'b/c': 3}],
    [[{a: 1, b: {c: null}}], {'a': 1, 'b/c': null}],
    [[{a: 1, b: [1, 2]}], {a: 1, b: [1, 2]}],
  ];
  test.each(cases)('flatten %s', (args, expected) => {
    expect(fn(...args)).toStrictEqual(expected);
  });
});
