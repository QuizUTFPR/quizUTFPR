export default (file) =>
  new Promise((resolve) => {
    const blob = new Blob(file);
    resolve(blob);
  });
