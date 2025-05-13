import React from 'react';
import workImage from '../assets/icons2/briefcase2.png';
import groceryImage from '../assets/icons2/shopping-cart2.png';
import airportImage from '../assets/icons2/plane2.png';
import partyImage from '../assets/icons2/party-popper2.png';
import musicImage from '../assets/icons2/music2.png';
import schoolImage from '../assets/icons2/graduation-cap2.png';
import routeImage from '../assets/icons2/route2.png';

interface TopBarProps {
  searchText: string;
  setSearchText: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

const categories = [
  { label: 'Grocery', value: 'Grocery', icon: groceryImage },
  { label: 'Airport', value: 'Airport', icon: airportImage },
  { label: 'Party', value: 'Party', icon: partyImage },
  { label: 'Work', value: 'Work', icon: workImage },
  { label: 'Class', value: 'Class', icon: schoolImage },
  { label: 'Event', value: 'Event', icon: musicImage },
  { label: 'Other', value: 'Other', icon: routeImage },
];

const TopBar: React.FC<TopBarProps> = ({
  searchText,
  setSearchText,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="sticky top-0 z-40 bg-white shadow-sm">
      {/* Search Bar */}
      <div className="p-3">
        <input
          type="text"
          placeholder="Search destination..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full max-w-md mx-auto block rounded-full border border-gray-300 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Filter Buttons */}
      <div className="overflow-x-auto whitespace-nowrap px-2 pb-3 flex gap-6">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`flex flex-col items-center text-sm shrink-0 ${
              selectedCategory === cat.value ? 'text-blue-600 font-semibold' : 'text-gray-600'
            }`}
          >
            <img src={cat.icon} alt={cat.label} className="w-8 h-8 mb-1" />
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
