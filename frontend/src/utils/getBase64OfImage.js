export default (file) =>
  new Promise((resolve, reject) => {
    if (file) {
      const base64 = new FileReader();
      base64.readAsDataURL(file);
      base64.onload = () => {
        resolve(base64.result);
      };
      base64.onerror = () => reject(new Error());
    } else {
      reject(new Error('Imagem Inválida'));
    }
  });
