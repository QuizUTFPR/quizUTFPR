function getAllMethods(obj) {
  const result = [];
  for (const id in obj) {
    try {
      if (typeof (obj[id]) === 'function') {
        result.push(`${id}: ${obj[id].toString()}`);
      }
    } catch (err) {
      result.push(`${id}: inaccessible`);
    }
  }
  return result;
}

export default getAllMethods;
