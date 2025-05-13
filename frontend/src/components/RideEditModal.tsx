import React, { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL;

type Ride = {
  _id: string;
  from: string;
  to: string;
  date: string;
  price?: number;
  seatsAvailable?: number;
  contact: string;
};

type Props = {
  ride: Ride | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
};

const RideEditModal: React.FC<Props> = ({ ride, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    price: '',
    seatsAvailable: '',
    contact: ''
  });

  useEffect(() => {
    if (ride) {
      setFormData({
        from: ride.from,
        to: ride.to,
        date: ride.date.slice(0, 16), // for datetime-local input
        price: ride.price?.toString() || '',
        seatsAvailable: ride.seatsAvailable?.toString() || '',
        contact: ride.contact
      });
    }
  }, [ride]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!ride) return;

    try {
      const res = await fetch(`${API_BASE}/rides/${ride._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: formData.price ? Number(formData.price) : undefined,
          seatsAvailable: Number(formData.seatsAvailable)
        })
      });

      if (res.ok) {
        onSave();
        onClose();
      } else {
        console.error('Failed to update ride');
      }
    } catch (err) {
      console.error('Error updating ride:', err);
    }
  };

  if (!isOpen || !ride) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Edit Ride</h2>
        <input name="from" value={formData.from} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="to" value={formData.to} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="date" type="datetime-local" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="price" type="number" placeholder="Price (optional)" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="seatsAvailable" type="number" value={formData.seatsAvailable} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="contact" value={formData.contact} onChange={handleChange} className="w-full p-2 border rounded" />

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default RideEditModal;
