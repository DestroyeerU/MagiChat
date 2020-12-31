import { Router } from 'express';

import UserController from '@controllers/UserController';

import authMiddleware from '@middlewares/auth';

const routes = Router();

routes.get('/', async (req, res) => {
  return res.json({ message: 'Hey there!' });
});

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.use(authMiddleware);

routes.get('/testAuth', async (req, res) => {
  return res.json({ message: 'You are authenticated!' });
});

export default routes;
