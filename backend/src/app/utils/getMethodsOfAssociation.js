function getAllMethods(obj) {
  // eslint-disable-next-line no-proto
  return Object.keys(obj.__proto__);
}

export default getAllMethods;
