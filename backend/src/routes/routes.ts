import { Router } from 'express';
import PostEndpoints from './post.endpoints';

const router = Router();

router.use('/post', PostEndpoints);

export default router;
