import express from 'express';

import { registerUser ,loginUser,getAllUsers, searchUsers, deleteUser, updateUser} from '../controllers/userController.js';
const router = express.Router();

router.post('/register', registerUser)
router.post('/login',loginUser)
router.get('/allUsers',getAllUsers)
router.post('/searchUsers',searchUsers)
router.delete('/deleteUser/:id',deleteUser);
router.put('/updateUser/:id',updateUser);

export default router;