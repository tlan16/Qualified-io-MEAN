const fn = require('../challenge3.2');

describe('max swap', () => {
  const cases = [
    [[[1, 2, 3]], 0],
    [[[1, 2, 2]], 0],
    [[[1, 1, 2]], 0],
    [[[3, 1, 2]], 2],
    [[[3, 2, 1]], 1],
    [[[4, 3, 2, 1]], 2],
  ];
  test.each(cases)('number of sway to sort %s', (args, expected) => {
    console.debug({args: JSON.stringify(args)});
    expect(fn(...args)).toStrictEqual(expected);
  });
});
