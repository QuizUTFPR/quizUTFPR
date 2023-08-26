export const nameFormatter = (completeName) => {
  const name = completeName;
  const parts = name.split(' ');
  const result = parts[0] + ' ' + parts[parts.length - 1];

  return result;
};
