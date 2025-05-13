import mongoose from 'mongoose';

const RideSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  seatsAvailable: {
    type: Number,
    required: false,
    default: 1,
  },
  contact: {
    type: String, // could be phone, IG handle, etc.
    required: true,
  },
  category: {
    type: String,
    enum: ['Grocery', 'Airport', 'Event', 'Class', 'Party', 'Work', 'Other'],
    default: 'Other'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
    
});

const Ride = mongoose.model('Ride', RideSchema);
export default Ride;
