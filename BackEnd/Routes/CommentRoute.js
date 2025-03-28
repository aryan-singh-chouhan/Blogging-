import express from 'express';
import { isLogin } from '../Middleware/isAdmin.js';
import { addcomment } from '../Controller/CommentController.js';

const commentRooute = express.Router()

commentRooute.post('/addcomment',isLogin, addcomment);

export default commentRooute;