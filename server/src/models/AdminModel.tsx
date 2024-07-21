import mongoose from 'mongoose';
const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);
export default mongoose.model('Admin', AdminSchema);
