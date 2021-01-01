import { Request, Response } from 'express';
import { getMongoRepository } from 'typeorm';

import { User } from '@entity/user';
import { RequestBody } from '@mytypes/request';

interface Create {
  name: string;
  email: string;
  password: string;
}

type CreateRequest = RequestBody<Create>;

class UserController {
  async index(req: Request, res: Response) {
    const users = await getMongoRepository(User).find();

    return res.json(users);
  }

  async create(req: CreateRequest, res: Response) {
    const { name, email, password } = req.body;

    const userData = getMongoRepository(User).create({
      name,
      email,
      password,
    });

    try {
      const user = await getMongoRepository(User).save(userData);

      return res.json(user);
    } catch (e) {
      return res.status(400).json({ error: 'Error creating user' });
    }
  }
}

export default new UserController();
