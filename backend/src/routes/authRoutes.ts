import authMiddleware from '@middlewares/auth';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.use(authMiddleware);

authRoutes.get('/testAuth', async (req, res) => {
  return res.json({ message: 'You are authenticated!' });
});

export default authRoutes;
