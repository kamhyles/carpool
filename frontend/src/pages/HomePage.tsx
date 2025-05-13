import React, { useState } from 'react';
import RideList from '../components/RideList';
import TopBar from '../components/TopBar';

const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="pt-0 px-4">
      <TopBar
        searchText={searchText}
        setSearchText={setSearchText}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <RideList
        searchText={searchText}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default HomePage;
