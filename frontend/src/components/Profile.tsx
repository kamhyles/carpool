import React, { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL;

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [name, setName] = useState('');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user?.id) {
      setMessage('You must be logged in to view your profile.');
      return;
    }

    // Optionally fetch latest name from server
    fetch(`${API_BASE}/users/${user.id}`)
      .then(res => res.json())
      .then(data => setName(data.name))
      .catch(() => setMessage('Failed to load profile info.'));
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          ...(password ? { password } : {})
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Profile updated successfully!');
        localStorage.setItem('user', JSON.stringify({ ...user, name }));
      } else {
        setMessage(data.error || 'Update failed.');
      }
    } catch {
      setMessage('Server error. Please try again.');
    }
  };

  return (
    <form onSubmit={handleUpdate} className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-center">My Profile</h2>

      <input
        type="text"
        placeholder="Name"
        className="w-full p-2 border rounded"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded bg-gray-100"
        value={email}
        disabled
      />

      <input
        type="password"
        placeholder="New Password (leave blank to keep current)"
        className="w-full p-2 border rounded"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Update Profile
      </button>

      {message && <p className="text-center text-sm text-red-600">{message}</p>}
    </form>
  );
};

export default Profile;
