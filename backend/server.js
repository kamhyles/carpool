import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import rideRoutes from './routes/rides.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Log all incoming requests (method + path)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

//Test route
app.get('/ping', (req, res) => {
  res.send('pong');
});


app.use(cors({
  origin: ['http://localhost:5173', 'http://10.2.198.69:5173']
}));
app.use(express.json());





mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

//API routes
app.use('/api/rides', rideRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
