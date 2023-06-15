export const nameFormatter = (completeName) => {
  const nameParts = completeName.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1)[0];

  const finalName = `${firstName} ${lastName}`;

  return finalName;
}