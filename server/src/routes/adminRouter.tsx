import { Router } from 'express';
import {
  createEvent,
  loginAdmin,
  registerAdmin,
  getEvent,
  getSingleEvent,
  deleteEvent,
  updateEvent,
  verifyPassword,
} from '../controllers/adminController';
import multer from 'multer';
import { authenticateAdmin } from '../middleware/authMiddleware';
const router = Router();
const upload = multer();

router.route('/signup').post(upload.none(), registerAdmin);
router.route('/login').post(upload.none(), loginAdmin);
router
  .route('/event')
  .post(upload.single('image'), authenticateAdmin, createEvent)
  .get(authenticateAdmin, getEvent);

router
  .route('/event/:id')
  .patch(authenticateAdmin, updateEvent)
  .get(authenticateAdmin, getSingleEvent)
  .delete(authenticateAdmin, deleteEvent);

router
  .route('/event/:id/verify-password')
  .post(authenticateAdmin, verifyPassword);

export default router;
