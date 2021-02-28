const fn = require('../challenge2');

describe('flattenMap', () => {
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
