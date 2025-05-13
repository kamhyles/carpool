import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PostRidePage from './pages/PostRidePage';
import ProfilePage from './pages/ProfilePage';
import MyRidesPage from './pages/MyRidesPage';
import Navbar from './components/Navbar';
import { ReactComponent as TestIcon } from './assets/airline.svg';

console.log(TestIcon); // Should log a React component function

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/post" element={<PostRidePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-rides" element={<MyRidesPage />} />
      </Routes>
    </>
  );
}

export default App;
