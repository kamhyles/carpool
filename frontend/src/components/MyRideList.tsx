import React, { useEffect, useState } from 'react';
import RideEditModal from './RideEditModal';

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

const MyRideList = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchRides = () => {
    if (!user?.id) return;
    fetch(`${API_BASE}/rides/user/${user.id}`)
      .then(res => res.json())
      .then(data => setRides(data))
      .catch(err => console.error('Error fetching user rides:', err));
  };

  useEffect(() => {
    fetchRides();
  }, [user?.id]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/rides/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setRides(prev => prev.filter(r => r._id !== id));
      } else {
        console.error('Failed to delete ride');
      }
    } catch (err) {
      console.error('Error deleting ride:', err);
    }
  };

  const handleEditClick = (ride: Ride) => {
    setSelectedRide(ride);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">My Rides</h2>
      {rides.length === 0 ? (
        <p>No rides posted yet.</p>
      ) : (
        rides.map(ride => (
          <div key={ride._id} className="border rounded p-4 shadow-md relative">
            <p><strong>From:</strong> {ride.from}</p>
            <p><strong>To:</strong> {ride.to}</p>
            <p><strong>Date:</strong> {new Date(ride.date).toLocaleString()}</p>
            {ride.price && <p><strong>Price:</strong> ${ride.price}</p>}
            {ride.seatsAvailable && <p><strong>Seats:</strong> {ride.seatsAvailable}</p>}
            <p><strong>Contact:</strong> {ride.contact}</p>
            <div className="absolute top-2 right-2 flex gap-3">
              <button
                onClick={() => handleEditClick(ride)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(ride._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      <RideEditModal
        ride={selectedRide}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchRides}
      />
    </div>
  );
};

export default MyRideList;

