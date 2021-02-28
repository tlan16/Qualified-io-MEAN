function looper(it, result) {
  if (isPlainObject(it)) {
    for (const [key, value] of Object.entries(it)) {
      if (isPlainObject(value)) {
        looper(value, result);
      } else {
        result.set(key, value);
      }
    }
  }
}

function flattenMap(map) {
  const result = new Map();
  looper(map, result);
  return Object.fromEntries(result);
}

function isPlainObject(it) {
  return typeof it === 'object' &&
    !Array.isArray(it) &&
    it !== undefined &&
    it !== null;
}

module.exports = flattenMap;
