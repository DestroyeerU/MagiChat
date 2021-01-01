import { Entity, Column, ObjectIdColumn, Unique, ObjectID, ObjectID as ObjectIDType } from 'typeorm';

@Entity()
export class Message {
  @ObjectIdColumn()
  id!: number;

  @Column()
  userId!: string;

  @Column()
  text!: string;
}

@Entity()
export class Conversation {
  @ObjectIdColumn()
  id!: number;

  @Column()
  otherUserId!: string;

  @Column((type) => Message)
  messages!: Message[];
}

@Entity()
// @Unique(['email'])
export class User {
  @ObjectIdColumn()
  id!: ObjectIDType;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column((type) => Conversation)
  conversations!: Conversation[];
}
