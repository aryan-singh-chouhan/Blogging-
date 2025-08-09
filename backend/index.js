import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import DataBaseConnect from './Config/DataBase.js'; 
import AuthUserRoute from './Routes/AuthUserRoute.js';
import cookieParser from 'cookie-parser';
import blogsRoute from './Routes/BlogRoute.js';
import dashBoardRoute from './Routes/DashBoard.js';
import commentRooute from './Routes/CommentRoute.js';
import publicRoute from './Routes/PublicRoute.js';

DataBaseConnect();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

const allowedOrigins = [
  "http://localhost:5173",
  "https://blogging-1-ef5e.onrender.com", // frontend
  "https://blogging-backend.onrender.com" // backend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(cookieParser());

app.use("/auth", AuthUserRoute);
app.use("/blog", blogsRoute);
app.use("/dashboard", dashBoardRoute);
app.use("/comment", commentRooute);
app.use("/public", publicRoute)



app.listen(PORT, () => {
  console.log(`server run on http://localhost:${PORT}`);
});
