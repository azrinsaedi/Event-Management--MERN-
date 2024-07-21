import { Request, Response } from 'express';
import { createCookie, removeCookie } from '../utils/cookieUtils';
import { hashPassword, comparePassword } from '../utils/passwordUtils';
import { StatusCodes } from 'http-status-codes';
import { createJWT, verifyJWT } from '../utils/tokenUtils';
import UserModel from '../models/UserModel';
import EventModel from '../models/EventModel';

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const { email, password } = req.body;

  if (await UserModel.findOne({ email: email })) {
    res.status(400).send('Email already used');
    return;
  }

  const user = await UserModel.create({
    email: email,
    password: password,
  });
  res.status(StatusCodes.OK).json({ user });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    res.status(StatusCodes.FORBIDDEN).json({ error: 'User not found' });
    return;
  }
  const password = req.body.password;
  const tokenData = createJWT({ userId: user._id?.toString() });

  const isValidAccount =
    user && (await comparePassword(password, user.password as string));
  if (!isValidAccount)
    if (!isValidAccount) {
      console.error('Wrong password');
      return res.redirect('/');
    }

  createCookie({
    tokenName: 'userToken',
    tokenData,
    res,
  });

  res.status(StatusCodes.CREATED).json({ msg: 'account logged in' });
};

export const getEvent = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;

  if (!userId) {
    res.status(403).json({ msg: 'No token' });
    return;
  }

  const event = await EventModel.find({ deleted: false });
  res.status(200).json({ event });
};

export const getSingleEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.userId;
  const { id } = req.params;

  if (!userId) {
    res.status(403).json({ msg: 'No token' });
    return;
  }
  const event = await EventModel.findOne({
    _id: id,
    deleted: false,
  });
  res.status(200).json({ event });
};
