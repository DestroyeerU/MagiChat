import { Response } from 'express';
import { ObjectID } from 'typeorm';

import { RequestAuthBody } from '@mytypes/requestAuth';

interface Create {
  toUserEmail: string;
}

type CreateRequest = RequestAuthBody<Create>;

class ConversationController {
  async create(req: CreateRequest, res: Response) {
    const { toUserEmail } = req.body;
    const userId = req.userId as ObjectID;

    return res.json({
      userId,
    });
  }
}

export default new ConversationController();
