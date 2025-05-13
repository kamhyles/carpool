import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import Ride from '../models/Ride.js';

const router = express.Router();

// GET /api/users/:id — fetch user info
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // hide password
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/users/:id — update name or password
router.put('/:id', async (req, res) => {
  try {
    const { name, password } = req.body;
    const updates = {};

    if (name) updates.name = name;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updates.password = hashed;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});


// GET /api/users/:id/rides — get all rides posted by a user
router.get('/:id/rides', async (req, res) => {
  try {
    const rides = await Ride.find({ userId: req.params.id }).sort({ date: -1 });
    res.status(200).json(rides);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rides for user' });
  }
});


export default router;
