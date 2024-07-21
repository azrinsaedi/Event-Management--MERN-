import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import adminRouter from './routes/adminRouter';
import userRouter from './routes/userRouter';
import morgan from 'morgan';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/user', userRouter);

const server = http.createServer(app);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack for debugging

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({ error: message });
});

const mongoUrl = process.env.MONGO_URL as string;

if (!mongoUrl) {
  console.error('MONGO_URL not defined in environment variables');
  process.exit(1);
}

try {
  mongoose.connect(mongoUrl);
  server.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
