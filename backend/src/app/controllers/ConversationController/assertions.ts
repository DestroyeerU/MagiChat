import { RequestError } from '@errors/request';
import Conversation from '@schemas/Conversation';

export async function assertConversationWithUserExists(toUserId: number) {
  const conversation = await Conversation.findOne({
    toUserId,
  });

  if (!conversation) {
    throw new RequestError('You already do not have a conversation with this user', 400);
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
