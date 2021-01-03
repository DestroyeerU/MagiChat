import { RequestError } from '@errors/request';
import Conversation from '@schemas/Conversation';

interface ConversationExistsParams {
  _id: string;
}

export async function assertConversationExists(params: ConversationExistsParams) {
  const { _id } = params;

  const conversation = await Conversation.findOne({
    _id,
  });

  if (!conversation) {
    throw new RequestError('Conversation not found', 400);
  }
}

export async function assertConversationWithUserNotExists(toUserId: number) {
  const conversation = await Conversation.findOne({
    toUserId,
  });

  if (conversation) {
    throw new RequestError('You already have a conversation with this user', 307);
  }
}
