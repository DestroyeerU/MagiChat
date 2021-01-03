import { Router } from 'express';

import UserController from '@controllers/UserController';
import LoginController from '@controllers/LoginController';

const routes = Router();

routes.get('/', async (req, res) => {
  return res.json({ message: 'Hey there!' });
});

routes.post('/login', LoginController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

export default routes;
