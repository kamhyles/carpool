import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL;

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                setMessage('Login successful! Redirecting...');
                setTimeout(() => navigate('/'), 1000);
            } else {
                setMessage(data.error || 'Login failed');
            }
        } catch (err) {
            setMessage('Server error. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleLogin} className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-2xl font-bold text-center">Login</h2>

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
                Login
            </button>

            {message && <p className="text-center text-sm text-red-600">{message}</p>}
            <p className="text-center text-sm text-gray-600">
                Don’t have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:underline">
                    Sign up
                </Link>
            </p>
        </form>

    );
};

export default LoginForm;
