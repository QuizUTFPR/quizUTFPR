import App from './app';

require('dotenv').config();

// Inicio o servidor na porta 3333;
// eslint-disable-next-line import/prefer-default-export
const server = App.listen(process.env.PORT, () => {
  // console.log(
  //   'RUNNING IN MODE: ',
  //   process.env.NODE_ENV,
  //   'on',
  //   process.env.PORT
  // );
});

module.exports = server;
