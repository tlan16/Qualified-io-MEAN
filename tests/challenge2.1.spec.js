const fn = require('../challenge2.1');

describe('flattenMap', () => {
  const cases = [
    [[{a: 1}], {a: 1}],
    [[{a: 1, b: 2}], {a: 1, b: 2}],
    [[{a: 1, b: null}], {a: 1, b: null}],
    [[{a: 1, b: {c: 3}}], {a: 1, c: 3}],
    [[{a: 1, b: {c: null}}], {a: 1, c: null}],
    [[{a: 1, b: [1, 2]}], {a: 1, b: [1, 2]}],
  ];
  test.each(cases)('flatten %s', (args, expected) => {
    console.debug({args: JSON.stringify(args)});
    expect(fn(...args)).toStrictEqual(expected);
  });
});
