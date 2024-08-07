import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);
export default mongoose.model('User', UserSchema);
