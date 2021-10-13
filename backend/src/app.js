/**
Importo a biblioteca express;
Importo as rotas externas e seus demais verbos (POST, GET, PUT, DELETE);
Importo as variáveis de ambiente
* */
import 'dotenv';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import './database';

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
     * */
    this.server.use(compression({ threshold: 0 }));
    this.server.use(helmet());
    this.server.use(express.json({ limit: '50mb' }));
    // this.server.use(express.urlencoded({ extended: true }));
    this.server.use(cors());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    /**
    Em this.server.use(routes), estou dizendo à aplicação
    para aplicar minhas rotas;
    * */
    this.server.use(routes);
  }
}

export default new App().server;
