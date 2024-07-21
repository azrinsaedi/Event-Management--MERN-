import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/tokenUtils';
import mongoose from 'mongoose';

declare module 'express-serve-static-core' {
  interface Request {
    admin?: {
      userId: mongoose.Types.ObjectId;
    };
    user?: {
      userId: mongoose.Types.ObjectId;
    };
  }
}

export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { adminToken } = req.cookies;
  if (!adminToken) {
    console.error('Error in token authentication');
    return res.redirect('/');
  }

  try {
    const { userId } = verifyJWT(adminToken);
    req.admin = { userId: new mongoose.Types.ObjectId(userId) };
    next();
  } catch (error) {
    console.error('Error in authenticateAdmin:', error);
    return res.redirect('/');
  }
};

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userToken } = req.cookies;
  if (!userToken) {
    console.error('Error in token authentication');
    return res.redirect('/');
  }

  try {
    const { userId } = verifyJWT(userToken);
    req.user = { userId: new mongoose.Types.ObjectId(userId) };
    next();
  } catch (error) {
    console.error('Error in authenticateAdmin:', error);
    return res.redirect('/');
  }
};
