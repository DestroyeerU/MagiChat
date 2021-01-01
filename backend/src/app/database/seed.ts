/* eslint-disable no-await-in-loop */
import { createConnection, EntityManager, getMongoRepository } from 'typeorm';
import { User } from '../entity/user';

async function createUsers(manager: EntityManager) {
  const users = [
    {
      name: 'Idaslon',
      email: 'idaslon@gmail.com',
      password: 'pass123',
    },
    {
      name: 'Destroyeer',
      email: 'destroyeer@gmail.com',
      password: 'pass123',
    },
  ];

  for (const user of users) {
    const { name, email, password } = user;

    const userData = getMongoRepository(User).create({
      name,
      email,
      password,
    });

    await manager.save(userData);
  }
}

async function run() {
  const connection = await createConnection();

  await createUsers(connection.manager);
  connection.close();
}

run();
