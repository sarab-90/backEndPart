import express from 'express';
import { register, login } from '../controllers/auth.Controller.js';

const router = express.Router();

router.post('/auth',register)
router.post('/auth', login)




export default router;