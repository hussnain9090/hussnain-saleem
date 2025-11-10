
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Role } from '../types';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user) {
        if(user.role === Role.ADMIN) {
          navigate('/admin');
        } else {
          navigate('/book');
        }
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      setError('Failed to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12 animate-fade-in">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Game Fire</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input id="email" type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input id="password" type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <p>Don't have an account? <Link to="/signup" className="text-brand-primary hover:underline">Sign Up</Link></p>
        </div>
        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="font-bold">Demo Credentials:</p>
          <p>User: user@gamefire.com / user123</p>
          <p>Admin: admin@gamefire.com / admin123</p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
