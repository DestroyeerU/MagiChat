import { Response } from 'express';
import { getMongoRepository } from 'typeorm';

import { encodeToken } from '@utils/auth';
import { RequestBody } from '@mytypes/request';
import { User } from '@entity/user';

interface Create {
  email: string;
  password: string;
}

type CreateRequest = RequestBody<Create>;

class LoginController {
  async create(req: CreateRequest, res: Response) {
    const { email, password } = req.body;

    const user = await getMongoRepository(User).findOne({
      where: {
        email,
      },
    });

    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'email and/or password invalid(s)' });
    }

    return res.json({
      user,
      token: encodeToken(user),
    });
  }
}

export default new LoginController();