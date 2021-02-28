// Flattens an hierarchical map into a single level
function extractKeys(index, value, result) {
  for (const i in value) {
    if (value.hasOwnProperty(i)) {
      let newIndex = i;
      const newValue = value[i];

      if (index.length > 0) {
        newIndex = index + '/' + i;
      }

      if (typeof newValue === 'object') {
        if (Array.isArray(newValue) === true) {
          result[newIndex] = newValue;
        } else if (newValue == null) {
          result[newIndex] = null;
        } else {
          extractKeys(newIndex, newValue, result);
        }
      } else {
        result[newIndex] = newValue;
      }
    }
  }
}

function flattenMap(map) {
  const newMap = {};
  extractKeys('', map, newMap);
  return newMap;
}

module.exports = flattenMap;
