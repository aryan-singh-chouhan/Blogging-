import express from 'express'; 
import {Create, deletePost, getBlog, update} from'../Controller/BlogController.js';
import { isAdmin } from '../Middleware/isAdmin.js';
import upload from '../Middleware/Multer.js';

const blogRoute = express.Router();

blogRoute.post('/create',isAdmin,upload.single('postimage'),Create);
blogRoute.delete('/delete/:id', deletePost);
blogRoute.get('/getblog',getBlog);
blogRoute.put('/update/:id',isAdmin,upload.single('postimage'),update);

export default blogRoute;