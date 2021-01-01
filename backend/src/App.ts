import './bootstrap';
import express, { Express } from 'express';
import { createConnection } from 'typeorm';

import routes from './routes';
import authRoutes from './authRoutes';

class App {
  server: Express;

  constructor() {
    this.server = express();

    this.database();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  database() {
    createConnection().then((_connection) => {
      // const userRepository = connection.getRepository(User);

      // eslint-disable-next-line no-console
      console.log('Connection started with database');
    });
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
    // this.server.use(authRoutes);
  }

  exceptionHandler() {
    // Code here, like an route
  }
}

export default new App().server;
