/**
Importo a biblioteca express;
Importo as rotas externas e seus demais verbos (POST, GET, PUT, DELETE);
**/
import express from 'express';
import routes from './routes';

class App {
  // O construtor irá invocar minha instância e os middlewares;
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    /** 
    Em this.server.use(express.json()), estou dizendo à aplicação
    para entender quando meu corpo de requisição for um JSON; 
    **/
    this.server.use(express.json());
  }

  routes() {
    /**
    Em this.server.use(routes), estou dizendo à aplicação
    para aplicar minhas rotas;
    **/
    this.server.use(routes);
  }
}

export default new App().server;