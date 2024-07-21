import { Router } from 'express';
import {
  registerUser,
  loginUser,
  getEvent,
  getSingleEvent
} from '../controllers/userController';
import { authenticateUser } from '../middleware/authMiddleware';

import multer from 'multer';

const router = Router();
const upload = multer();

router.route('/signup').post(upload.none(), registerUser);
router.route('/login').post(upload.none(), loginUser);
router.route('/event').get(authenticateUser, getEvent);
router.route('/event/:id').get(authenticateUser, getSingleEvent);
export default router;
