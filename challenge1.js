// return an array of a number's divisible
function divisors(integer) {
  if (integer < 1) {
    throw new Error('input must be a positive integer');
  }

  const divisors = new Set([1, integer]);
  for (let x = 2; x < integer; x++) {
    if (integer % x === 0) {
      divisors.add(x);
    }
  }
  return [...divisors].sort((a, b) => a - b);
}

module.exports = divisors;
