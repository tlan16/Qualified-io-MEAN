// Return the minimum number of swaps needed to sort an array in reverse.
function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function maximumSwaps(arrayOfNumber) {
  let swaps = 0;
  const length = arrayOfNumber.length;

  for (let currentIndex = 0; currentIndex < length; currentIndex++) {
    let indexOfMaximumNumber = currentIndex;
    for (let sweepIndex = currentIndex; sweepIndex < length; sweepIndex++) {
      if (arrayOfNumber[sweepIndex] < arrayOfNumber[indexOfMaximumNumber]) {
        indexOfMaximumNumber = sweepIndex;
      }
    }
    if (currentIndex !== indexOfMaximumNumber) {
      swap(arrayOfNumber, currentIndex, indexOfMaximumNumber);
      swaps++;
    }
  }
  return swaps;
}

module.exports = maximumSwaps;
