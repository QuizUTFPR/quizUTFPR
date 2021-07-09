function getAllMethods(obj) {
  const result = [];
  obj.foreach((item, id) => {
    try {
      if (typeof item === 'function') {
        result.push(`${id}: ${item.toString()}`);
      }
    } catch (err) {
      result.push(`${id}: inaccessible`);
    }
  });
  return result;
}

export default getAllMethods;
