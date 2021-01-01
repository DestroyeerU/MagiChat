import ConversationController from '@controllers/ConversationController';
import authMiddleware from '@middlewares/auth';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.use(authMiddleware);

authRoutes.get('/testAuth', async (req, res) => {
  return res.json({ message: 'You are authenticated!' });
});

authRoutes.post('/conversations', ConversationController.create);

export default authRoutes;
