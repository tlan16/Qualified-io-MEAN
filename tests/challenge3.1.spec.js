const fn = require('../challenge3.1');

describe('min swap', () => {
  const cases = [
    [[[3, 2, 1]], 0],
    [[[3, 1, 1]], 0],
    [[[3, 3, 1]], 0],
    [[[3, 1, 2]], 1],
    [[[1, 2, 3]], 1],
    [[[1, 2, 3, 4]], 2],
  ];
  test.each(cases)('number of sway to sort %s', (args, expected) => {
    expect(fn(...args)).toStrictEqual(expected);
  });
});
