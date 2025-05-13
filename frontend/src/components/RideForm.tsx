import React, { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL;

const RideForm = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [seatsAvailable, setSeatsAvailable] = useState('1');
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || !user.id) {
      return setMessage('You must be logged in to post a ride.');
    }

    try {
      const res = await fetch(`${API_BASE}/rides`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to,
          date,
          price: price ? Number(price) : undefined,
          seatsAvailable: Number(seatsAvailable),
          contact,
          category,
          userId: user.id
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Ride posted successfully!');
        setFrom('');
        setTo('');
        setDate('');
        setPrice('');
        setSeatsAvailable('1');
        setContact('');
        setCategory('');
      } else {
        setMessage(data.error || 'Failed to post ride');
      }
    } catch (err) {
      setMessage('Server error. Try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-center">Post a Ride</h2>

      <input type="text" placeholder="From" value={from} onChange={e => setFrom(e.target.value)} required className="w-full p-2 border rounded" />
      <input type="text" placeholder="To" value={to} onChange={e => setTo(e.target.value)} required className="w-full p-2 border rounded" />
      <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required className="w-full p-2 border rounded" />
      <input type="number" placeholder="Price (optional)" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded" />
      <input type="number" placeholder="Seats Available" min="1" value={seatsAvailable} onChange={e => setSeatsAvailable(e.target.value)} required className="w-full p-2 border rounded" />
      <input type="text" placeholder="Contact (Snap, phone, etc.)" value={contact} onChange={e => setContact(e.target.value)} required className="w-full p-2 border rounded" />

      <select value={category} onChange={e => setCategory(e.target.value)} required className="w-full p-2 border rounded">
        <option value="">Select Ride Purpose</option>
        <option value="Grocery">🛒 Grocery Trip</option>
        <option value="Airport">✈️ Airport</option>
        <option value="Event">🎵 Event</option>
        <option value="Class">🎓 Class Commute</option>
        <option value="Party">🎉 Party</option>
        <option value="Work">💼 Work</option>
        <option value="Other">❓ Other</option>
      </select>

      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
        Post Ride
      </button>

      {message && <p className="text-center text-sm text-red-600">{message}</p>}
    </form>
  );
};

export default RideForm;

