import { Response } from 'express';

import { assertConversationWithUserExists } from '@controllers/ConversationController/assertions';
import { RequestAuth, RequestAuthBody } from '@mytypes/requestAuth';
import { RequestError } from '@errors/request';

import Conversation from '@schemas/Conversation';
import Message from '@schemas/Message';

interface Create {
  toUserId: number;
  text: string;
}

type IndexRequest = RequestAuth;
type CreateRequest = RequestAuthBody<Create>;

class MessageController {
  async index(req: IndexRequest, res: Response) {
    const messages = await Message.find();

    return res.json(messages);
  }

  async create(req: CreateRequest, res: Response) {
    const { toUserId, text } = req.body;
    const date = new Date();

    try {
      await assertConversationWithUserExists(toUserId);
    } catch (e) {
      const { message, statusCode } = e as RequestError;
      return res.status(statusCode).json({ message });
    }

    const message = await Message.create({
      text,
      date,
    });

    await Conversation.updateOne(
      {
        toUserId,
      },
      {
        $push: { messages: message._id },
      }
    );

    return res.json(message);
  }
}

export default new MessageController();
