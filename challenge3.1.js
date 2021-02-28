// Return the minimum number of swaps needed to sort an array in reverse.
function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function minimumSwaps(arrayOfNumber) {
  let swaps = 0;
  const length = arrayOfNumber.length;

  for (let currentIndex = 0; currentIndex < length; currentIndex++) {
    let indexOfMinimumNumber = currentIndex;
    for (let sweepIndex = currentIndex; sweepIndex < length; sweepIndex++) {
      if (arrayOfNumber[sweepIndex] > arrayOfNumber[indexOfMinimumNumber]) {
        indexOfMinimumNumber = sweepIndex;
      }
    }
    if (currentIndex !== indexOfMinimumNumber) {
      swap(arrayOfNumber, currentIndex, indexOfMinimumNumber);
      swaps++;
    }
  }
  return swaps;
}

module.exports = minimumSwaps;
