import express from 'express';
import Ride from '../models/Ride.js';

const router = express.Router();

// GET all rides
router.get('/', async (req, res) => {
  try {
    const rides = await Ride.find().sort({ date: 1 });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new ride
router.post('/', async (req, res) => {
  try {
    console.log('POST request received:', req.body);
    const { from, to, date, price, seatsAvailable, contact, category, userId } = req.body;

    const newRide = new Ride({
      from,
      to,
      date: new Date(date), // 🔧 convert to Date object
      price,
      seatsAvailable,
      contact,
      category,
      userId,
    });

    const savedRide = await newRide.save();
    res.status(201).json(savedRide);
  } catch (err) {
    console.error('Error saving ride:', err.message); // Optional: better debug logging
    res.status(400).json({ error: 'Invalid ride data' });
  }
});

// GET rides for a specific user
router.get('/user/:id', async (req, res) => {
  try {
    const userRides = await Ride.find({ userId: req.params.id }).sort({ date: 1 });
    res.json(userRides);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user rides' });
  }
});

// DELETE a ride by ID
router.delete('/:id', async (req, res) => {
  try {
    const ride = await Ride.findByIdAndDelete(req.params.id);
    if (!ride) {
      return res.status(404).json({ error: 'Ride not found' });
    }
    res.json({ message: 'Ride deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete ride' });
  }
});

// UPDATE a ride
router.put('/:id', async (req, res) => {
  try {
    const updatedRide = await Ride.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedRide) return res.status(404).json({ error: 'Ride not found' });
    res.json(updatedRide);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update ride' });
  }
});



export default router;

