import { Response } from 'express';

import { RequestAuth, RequestAuthBody } from '@mytypes/requestAuth';
import Conversation from '@schemas/Conversation';

import { RequestError } from '@errors/request';
import { assertUserExists } from '@controllers/UserController/assertions';
import { assertConversationWithUserNotExists } from './assertions';

interface Create {
  toUserId: number;
}

type IndexRequest = RequestAuth;
type CreateRequest = RequestAuthBody<Create>;

class ConversationController {
  async index(req: IndexRequest, res: Response) {
    const conversations = await Conversation.find();

    return res.json(conversations);
  }

  async create(req: CreateRequest, res: Response) {
    const { toUserId } = req.body;

    try {
      await assertUserExists({ id: toUserId });
      await assertConversationWithUserNotExists(toUserId);
    } catch (e) {
      const { message, statusCode } = e as RequestError;
      return res.status(statusCode).json({ message });
    }

    const conversation = await Conversation.create({
      toUserId,
    });

    return res.json(conversation);
  }
}

export default new ConversationController();
