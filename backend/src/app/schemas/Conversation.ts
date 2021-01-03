import { Document, model, Schema } from 'mongoose';
import { MessageInterface } from './Message';

export interface ConversationInterface {
  toUserId: number;
  messages: string[] | MessageInterface[];
}

export type ConversationDocument = Document & ConversationInterface;

const ConversationSchema = new Schema({
  toUserId: { type: Number, required: true },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

export default model<ConversationDocument>('Conversation', ConversationSchema);
