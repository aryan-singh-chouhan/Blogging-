import express from "express";
import { isAdmin } from "../Middleware/isAdmin.js";
import { deleteUser, getAllData, getUser } from "../Controller/DashBoardController.js";

const dashBoardRoute = express.Router();

dashBoardRoute.get('/', isAdmin, getAllData);

dashBoardRoute.get('/allpost', isAdmin, getAllData);
dashBoardRoute.get('/getuser', isAdmin, getUser);
dashBoardRoute.delete('/deleteuser/:id', isAdmin, deleteUser);

export default dashBoardRoute;