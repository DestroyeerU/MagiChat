import { response, Router } from 'express';

import { getConnection } from 'typeorm';

import authMiddleware from '@middlewares/auth';

import { User } from './app/entity/user';

const routes = Router();

routes.get('/', async (req, res) => {
  return res.json({ message: 'Hey there!' });
});

routes.get('/users/create', async (req: Request, res: Response) => {
  const userData = getConnection().getRepository(User).create({
    name: 'Idaslon',
  });

  const user = await getConnection().getRepository(User).save(userData);

  return res.json(user);
});

routes.get('/users', async (req: Request, res: Response) => {
  const users = await getConnection().getRepository(User).find();

  return res.json(users);
});

routes.use(authMiddleware);

routes.get('/testAuth', async (req, res) => {
  return res.json({ message: 'You are authenticated!' });
});

export default routes;
