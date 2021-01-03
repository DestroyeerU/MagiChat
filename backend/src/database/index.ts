import mongoose from 'mongoose';
import { createConnection } from 'typeorm';

class Database {
  mongoConnection!: Promise<typeof mongoose>;

  constructor() {
    this.relationalTypeorm();
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL || '', {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }

  relationalTypeorm() {
    createConnection().then((connection) => {
      // eslint-disable-next-line no-console
      // console.log('Connection started with database');
    });
  }
}

export default new Database();
