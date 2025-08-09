import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import DataBaseConnect from './Config/DataBase.js';
import AuthUserRoute from './Routes/AuthUserRoute.js';
import blogsRoute from './Routes/BlogRoute.js';
import dashBoardRoute from './Routes/DashBoard.js';
import commentRoute from './Routes/CommentRoute.js';
import publicRoute from './Routes/PublicRoute.js';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to Database
console.log("Starting database connection...");
DataBaseConnect();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'uploads')));

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

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running successfully 🚀');
});

app.use("/auth", AuthUserRoute);
app.use("/blog", blogsRoute);
app.use("/dashboard", dashBoardRoute);
app.use("/comment", commentRoute);
app.use("/public", publicRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
