import './bootstrap';
import express, { Express } from 'express';

import routes from './routes';
// import authRoutes from './routes/authRoutes';

import './database';

class App {
  server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
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
