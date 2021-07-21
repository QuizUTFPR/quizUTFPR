import Compress from 'compress.js';

const compress = new Compress();

export default (file) =>
  new Promise((resolve, reject) => {
    if (file) {
      compress
        .compress([file], {
          size: 1, // the max size in MB, defaults to 2MB
          quality: 0.7, // the quality of the image, max is 1,
          maxWidth: 800, // the max width of the output image, defaults to 600px
          maxHeight: 600, // the max height of the output image, defaults to 1920px
          resize: true, // defaults to true, set false if you do not want to resize the image width and height
        })
        .then((data) => {
          console.log(data[0]);
          resolve(data[0].prefix + data[0].data);
        });

      // const base64 = new FileReader();
      // base64.readAsDataURL(file);
      // base64.onload = () => {
      //   resolve(base64.result);
      // };
      // base64.onerror = () => reject(new Error());
    } else {
      reject(new Error('Imagem Inválida'));
    }
  });
