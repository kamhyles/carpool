import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL;

const SignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_BASE}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Signup successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 1500); // redirect after 1.5s
            } else {
                setMessage(data.error || 'Signup failed');
            }
        } catch (err) {
            setMessage('Server error. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSignup} className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>

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
                className="w-full p-2 border rounded"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />

            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                Sign Up
            </button>

            {message && <p className="text-center text-sm text-red-600">{message}</p>}
            <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Log in
                </Link>
            </p>
        </form>
    );
};

export default SignupForm;
