import mongoose from 'mongoose';
const EventSchema = new mongoose.Schema(
  {
    name: String,
    start_date: Date,
    end_date: Date,
    location: String,
    image: String,
    status: {
      type: String,
      enum: ['Ongoing', 'Completed'],
      default: 'Ongoing',
    },
    deleted: { type: Boolean, default: false },
    admin: { type: mongoose.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
);
export default mongoose.model('Event', EventSchema);
