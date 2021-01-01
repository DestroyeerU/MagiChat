import { Response } from 'express';
import { getMongoRepository, ObjectID } from 'typeorm';

import { RequestAuthBody } from '@mytypes/requestAuth';
import { Conversation, User } from '@entity/user';

interface Create {
  toUserEmail: string;
}

type CreateRequest = RequestAuthBody<Create>;

class ConversationController {
  async create(req: CreateRequest, res: Response) {
    const { toUserEmail } = req.body;
    const userId = req.userId as ObjectID;

    const toUser = await getMongoRepository(User).findOne({
      email: toUserEmail,
    });

    // const conversation = new Conversation();

    return res.json({
      userId,
      toUser,
    });
  }
}

export default new ConversationController();
