import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { RequestBody } from '@typess/requesta';

import { User } from '../entity/user';

interface Create {
  name: string;
}

type CreateRequest = RequestBody<Create>;

class UserController {
  async index(req: Request, res: Response) {
    const users = await getRepository(User).find();

    return res.json(users);
  }

  async create(req: CreateRequest, res: Response) {
    const { name } = req.body;

    const userData = getRepository(User).create({
      name,
    });

    const user = await getRepository(User).save(userData);

    return res.json(user);
  }
}

export default new UserController();
