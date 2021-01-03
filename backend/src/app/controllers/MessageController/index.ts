import { Response } from 'express';

import { assertConversationExists } from '@controllers/ConversationController/assertions';
import { RequestAuth, RequestAuthParams } from '@mytypes/requestAuth';
import { RequestError } from '@errors/request';

import Conversation from '@schemas/Conversation';
import Message from '@schemas/Message';

type Index = {
  conversationId: string;
};

interface Create {
  text: string;
}

type IndexRequest = RequestAuthParams<Index>;
type CreateRequest = RequestAuth<Create, Index>;

class MessageController {
  async index(req: IndexRequest, res: Response) {
    const { conversationId } = req.params;

    const conversationMessages = await Conversation.findById(conversationId).populate('messages');

    return res.json(conversationMessages);
  }

  async create(req: CreateRequest, res: Response) {
    const { conversationId } = req.params;
    const { text } = req.body;

    const date = new Date();

    try {
      await assertConversationExists({ _id: conversationId });
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
        _id: conversationId,
      },
      {
        $push: { messages: message._id },
      }
    );

    return res.json(message);
  }
}

export default new MessageController();
