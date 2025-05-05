import { Router } from 'express';
import PostEndpoints from './post.endpoints';
import UserEndpoints from './user.endpoints';

const router = Router();

router.use('/post', PostEndpoints);
router.use('/user', UserEndpoints);

export default router;
