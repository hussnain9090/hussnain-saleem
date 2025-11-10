
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_BOOKINGS, MOCK_CONSOLES, MOCK_MESSAGES } from '../../constants';
import { BookingStatus } from '../../types';
import Card from '../../components/ui/Card';
import { Calendar, Gamepad2, Hourglass, MessageCircle } from 'lucide-react';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ElementType }> = ({ title, value, icon: Icon }) => (
    <Card className="flex items-center p-4">
        <div className="p-3 rounded-full bg-brand-primary/20 text-brand-primary mr-4">
            <Icon size={24} />
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </Card>
);

const AdminDashboard: React.FC = () => {
    const totalBookings = MOCK_BOOKINGS.length;
    const activeBookings = MOCK_BOOKINGS.filter(b => b.status === BookingStatus.PENDING).length;
    const totalConsoles = MOCK_CONSOLES.length;
    const pendingMessages = MOCK_MESSAGES.filter(m => !m.replied).length;

    // Data for the chart
    const bookingData = MOCK_BOOKINGS.reduce((acc, booking) => {
        const date = new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const existing = acc.find(item => item.name === date);
        if (existing) {
            existing.bookings += 1;
        } else {
            acc.push({ name: date, bookings: 1 });
        }
        return acc;
    }, [] as { name: string; bookings: number }[]).sort((a,b) => new Date(a.name).getTime() - new Date(b.name).getTime());


  return (
    <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Bookings" value={totalBookings} icon={Calendar} />
            <StatCard title="Active Bookings" value={activeBookings} icon={Hourglass} />
            <StatCard title="Total Consoles" value={totalConsoles} icon={Gamepad2} />
            <StatCard title="Pending Messages" value={pendingMessages} icon={MessageCircle} />
        </div>

        {/* Bookings Chart */}
        <Card>
            <h2 className="text-xl font-bold mb-4">Booking Trends (Last 7 Days)</h2>
             <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bookingData.slice(-7)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', border: 'none', borderRadius: '0.5rem' }}/>
                    <Legend />
                    <Bar dataKey="bookings" fill="#FF4500" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    </div>
  );
};

export default AdminDashboard;
