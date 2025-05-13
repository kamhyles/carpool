import React, { useEffect, useState } from 'react';
import groceryImage from '../assets/trolley.png';
import airportImage from '../assets/plane.png';
import workImage from '../assets/briefcase.png';
import schoolImage from '../assets/education.png';
import musicImage from '../assets/musical-note.png';
import partyImage from '../assets/party-popper.png';
import routeImage from '../assets/delivery.png';

const API_BASE = import.meta.env.VITE_API_URL;

const categoryImages: Record<string, string> = {
  Grocery: groceryImage,
  Airport: airportImage,
  Work: workImage,
  Class: schoolImage,
  Event: musicImage,
  Party: partyImage,
  Other: routeImage,
};

type Ride = {
  _id: string;
  from: string;
  to: string;
  date: string;
  price?: number;
  seatsAvailable?: number;
  contact: string;
  category: string;
};

type RideListProps = {
  searchText: string;
  selectedCategory: string;
};

const RideList = ({ searchText, selectedCategory }: RideListProps) => {
  const [rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/rides`)
      .then(res => res.json())
      .then(data => setRides(data))
      .catch(err => console.error('Error fetching rides:', err));
  }, []);

  const filteredRides = rides.filter(ride => {
    const matchesSearch = ride.from.toLowerCase().includes(searchText.toLowerCase()) ||
                          ride.to.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory = selectedCategory ? ride.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-left">Available Rides</h2>
      {filteredRides.length === 0 ? (
        <p className="text-gray-600">No rides found.</p>
      ) : (
        <div className="space-y-6">
          {filteredRides.map(ride => {
            const imageSrc = categoryImages[ride.category] || routeImage;

            return (
              <div
                key={ride._id}
                className="bg-white border border-gray-300 rounded-lg shadow overflow-hidden"
              >
                {/* Image */}
                <div className="bg-gray-100 flex items-center justify-center h-56">
                  <img
                    src={imageSrc}
                    alt={`${ride.category} Icon`}
                    className="w-32 h-32 object-contain"
                  />
                </div>

                {/* Info */}
                <div className="p-4 space-y-1 text-left">
                  <div className="flex justify-between">
                    <p className="font-semibold">From: {ride.from}</p>
                    <p className="font-semibold">To: {ride.to}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(ride.date).toLocaleString()}
                  </p>
                  {ride.price && <p className="text-sm">Price: ${ride.price}</p>}
                  {ride.seatsAvailable && (
                    <p className="text-sm">Seats: {ride.seatsAvailable}</p>
                  )}
                  <p className="text-sm">Contact: {ride.contact}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RideList;

