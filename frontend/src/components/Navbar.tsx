import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300 shadow-md
        flex justify-around items-center py-2 transition-transform duration-300
        ${visible ? 'translate-y-0' : 'translate-y-full'}
      `}
    >
      <Link to="/" className="text-sm text-blue-600 font-medium">Home</Link>
      <Link to="/post" className="text-sm text-blue-600 font-medium">Post</Link>
      <Link to="/my-rides" className="text-sm text-blue-600 font-medium">My Rides</Link>
      <Link
        to={user ? "/profile" : "/login"}
        className="text-sm text-blue-600 font-medium"
      >
        {user ? "Profile" : "Login"}
      </Link>
    </nav>
  );
};

export default Navbar;
