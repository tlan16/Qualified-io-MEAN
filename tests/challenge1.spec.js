const fn = require('../challenge1');

describe('divisors', () => {
  const cases = [
    [[1], [1]],
    [[2], [1, 2]],
    [[15], [1, 3, 5, 15]],
  ];
  test.each(cases)('%d is divisible by %s', (args, expected) => {
    expect(fn(...args)).toStrictEqual(expected);
  });
});
