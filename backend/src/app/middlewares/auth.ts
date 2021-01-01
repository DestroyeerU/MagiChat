import { Request, Response, NextFunction } from 'express';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';

import { User } from '@entity/user';
import { decodeToken } from '@utils/auth';

interface AuthRequest extends Request {
  userId?: ObjectID;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');
  const tokenDecoded = await decodeToken(token);

  if (!tokenDecoded) {
    return res.status(400).json({ error: 'Token Invalid' });
  }
  const user = await getMongoRepository(User).findOne(tokenDecoded.id);

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  req.userId = user.id;
  return next();
};

export default authMiddleware;
