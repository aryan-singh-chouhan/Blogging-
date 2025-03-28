import express from 'express';
import { getSinglePost } from '../Controller/PublicController.js';

const publicRoute = express.Router();

publicRoute.get('/singleblog/:id',getSinglePost)

export default publicRoute;