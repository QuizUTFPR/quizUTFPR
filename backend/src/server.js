import App from './app';

require('dotenv').config();

// Inicio o servidor na porta 3333;
App.listen(process.env.PORT, () => {
  console.log(
    'RUNNING IN MODE: ',
    process.env.NODE_ENV,
    'on',
    process.env.PORT
  );
});
