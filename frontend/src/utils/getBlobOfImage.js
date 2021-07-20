export default (file) =>
  new Promise(() => {
    const blob = new Blob(file);
    return blob;
  });
