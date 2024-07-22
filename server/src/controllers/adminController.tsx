import { Request, Response } from 'express';
import { comparePassword, hashPassword } from '../utils/passwordUtils';
import AdminModel from '../models/AdminModel';
import EventModel from '../models/EventModel';
import { StatusCodes } from 'http-status-codes';
import { createJWT } from '../utils/tokenUtils';
import { createCookie } from '../utils/cookieUtils';
import { v2 as cloudinary } from 'cloudinary';
import { formatImage } from '../middleware/multerMiddleware';
import mongoose from 'mongoose';

export const registerAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const { email, password } = req.body;

  if (await AdminModel.findOne({ email: email })) {
    res.status(400).send('Email already used');
    return;
  }

  const admin = await AdminModel.create({
    email: email,
    password: password,
  });
  res.status(200).json({ admin });
};

export const loginAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const admin = await AdminModel.findOne({ email: req.body.email });
  if (!admin) {
    res.status(StatusCodes.FORBIDDEN).json({ error: 'Admin not found' });
    return;
  }
  const password = req.body.password;
  const tokenData = createJWT({ userId: admin._id?.toString() });

  const isValidAccount =
    admin && (await comparePassword(password, admin.password as string));

  if (!isValidAccount) {
    console.error('Wrong password');
    return res.redirect('/');
  }

  createCookie({
    tokenName: 'adminToken',
    tokenData,
    res,
  });

  res.status(StatusCodes.CREATED).json({ msg: 'account logged in' });
};

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, location, start_date, end_date } = req.body;

  if (!req.admin) {
    res.status(401).json({ error: 'Admin not authenticated' });
    return;
  }

  const userId = req.admin?.userId;

  if (req.file) {
    try {
      const formattedFile = formatImage(req.file);
      if (!formattedFile) {
        throw new Error('Error formatting file');
      }
      const response = await cloudinary.uploader.upload(formattedFile);
      req.body.image = response.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ msg: 'Error uploading image' });
      return;
    }
  }

  try {
    const event = await EventModel.create({
      name,
      location,
      start_date,
      end_date,
      admin: userId,
      image: req.body.image,
    });

    res.status(200).json({ event });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ msg: 'Error creating event' });
  }
};

export const getEvent = async (req: Request, res: Response): Promise<void> => {
  const userId = req.admin?.userId;

  if (!userId) {
    res.status(403).json({ msg: 'No token' });
    return;
  }

  const event = await EventModel.find({ admin: userId, deleted: false });
  res.status(200).json({ event });
};

export const updateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.admin?.userId;
  const { id } = req.params;
  const { name, location, status } = req.body;
  if (!userId) {
    res.status(403).json({ msg: 'No token' });
    return;
  }
  const event = await EventModel.findOneAndUpdate(
    {
      _id: id,
      deleted: false,
      admin: userId,
    },
    { name, location, status }
  );
  res.status(200).json({ event });
};

export const getSingleEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.admin?.userId;
  const { id } = req.params;

  if (!userId) {
    res.status(403).json({ msg: 'No token' });
    return;
  }
  const event = await EventModel.findOne({
    admin: userId,
    _id: id,
    deleted: false,
  });
  res.status(200).json({ event });
};

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.admin?.userId;
  const { id } = req.params;

  if (!userId) {
    res.status(403).json({ msg: 'No token' });
    return;
  }
  const event = await EventModel.findOneAndUpdate(
    { admin: userId, _id: id },
    {
      deleted: true,
    }
  );
  res.status(200).json({ event });
};

export const verifyPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.admin?.userId;
  const { password } = req.body;

  const fetchedPassword = await AdminModel.findOne({
    _id: userId,
  });

  if (!fetchedPassword?.password) {
    res.status(404).send(false);
    return;
  }

  const result = await comparePassword(password, fetchedPassword?.password);

  if (result === true) {
    res.send(result);
    return;
  }

  res.status(403).send(result);
  return;
};
