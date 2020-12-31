import './bootstrap';
import express, { Express } from 'express';

import { createConnection } from 'typeorm';

import { User } from './app/entity/user';
import routes from './routes';

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
    createConnection().then((connection) => {
      // const userRepository = connection.getRepository(User);
      console.log('Connection started with database');
    });
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    // Code here, like an route
  }
}

export default new App().server;
