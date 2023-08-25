import express from 'express';
import { createUser,getUser } from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.get('/',getUser);
userRoutes.post('/',createUser);

export default userRoutes;