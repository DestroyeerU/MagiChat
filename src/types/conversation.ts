import { User } from './user';

export interface ConversationIndex {
  _id: string;
  user: User;

  lastMessage?: string;
}

export interface ConversationCreate {
  _id: string;
  toUserId?: number;
}
