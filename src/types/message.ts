import { User } from './user';

interface ChatConversation {
  _id: string;
  user: User;
  toUser: User;
}

export interface Message {
  _id: string;
  text: string;
  date: string;
}

export interface Chat {
  conversation: ChatConversation;
  messages: Message[];
}
