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
    const { from, to, date, price, seatsAvailable, contact } = req.body;

    const newRide = new Ride({
      from,
      to,
      date,
      price,
      seatsAvailable,
      contact,
    });

    const savedRide = await newRide.save();
    res.status(201).json(savedRide);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ride data' });
  }
});

export default router;
