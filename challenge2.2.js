function looper(it, cumulatedKey, result) {
  if (isPlainObject(it)) {
    for (const [key, value] of Object.entries(it)) {
      let newKey = key;
      if (cumulatedKey !== undefined) {
        newKey = [cumulatedKey, key].join('/');
      }
      if (isPlainObject(value)) {
        looper(value, newKey, result);
      } else {
        result.set(newKey, value);
      }
    }
  }
}

function flattenMap(map) {
  const result = new Map();
  looper(map, undefined, result);
  return Object.fromEntries(result);
}

function isPlainObject(it) {
  return typeof it === 'object' &&
    !Array.isArray(it) &&
    it !== undefined &&
    it !== null;
}

module.exports = flattenMap;
