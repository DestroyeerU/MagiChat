import mongoose from 'mongoose';
import { createConnection } from 'typeorm';

class Database {
  mongoConnection!: Promise<typeof mongoose>;

  constructor() {
    this.sqlite();
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL || '', {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }

  sqlite() {
    createConnection().then((_connection) => {
      // eslint-disable-next-line no-console
      // console.log('Connection started with database');
    });
  }
}

export default new Database();
