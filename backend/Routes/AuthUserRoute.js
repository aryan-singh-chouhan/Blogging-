import express from 'express';
import {Login, Register,LogOut} from '../Controller/AuthUserController.js';
import upload from '../Middleware/Multer.js';

const router = express.Router();

router.route('/register').post(upload.single('profile') ,Register);
router.route('/login').post(Login);
router.route('/logout').get(LogOut);

export default router;