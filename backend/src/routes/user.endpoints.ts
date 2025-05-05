import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

router.get('/', UserController.onGetUsers);
router.post('/', UserController.onCreateUser);
router.patch('/:id', UserController.onEditUser);
router.delete('/:id', UserController.onDeleteUser);

export default router;
