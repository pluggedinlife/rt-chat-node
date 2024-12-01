import { Router } from 'express';
import PostController from '../controllers/postController';

const router = Router();

router.get('/', PostController.onGetPosts);
router.post('/', PostController.onCreatePost);
router.patch('/:id', PostController.onEditPost);
router.delete('/:id', PostController.onDeletePost);

export default router;
