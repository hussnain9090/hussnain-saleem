
import React, { useState, useMemo } from 'react';
import { MOCK_BOOKINGS } from '../../constants';
import { Booking, BookingStatus } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const AdminBookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<BookingStatus | 'all'>('all');

    const handleMarkComplete = (bookingId: string) => {
        setBookings(prev =>
            prev.map(b =>
                b.id === bookingId ? { ...b, status: BookingStatus.COMPLETED } : b
            )
        );
    };

    const filteredBookings = useMemo(() => {
        return bookings
            .filter(b => {
                if (filterStatus === 'all') return true;
                return b.status === filterStatus;
            })
            .filter(b =>
                b.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.consoleName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [bookings, searchTerm, filterStatus]);

    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold">Manage Bookings</h1>

            <Card>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <Input
                        id="search"
                        type="text"
                        placeholder="Search by user or console..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="flex-grow"
                    />
                    <select
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value as any)}
                        className="p-2 rounded-md bg-light-surface dark:bg-dark-surface border border-gray-300 dark:border-gray-600"
                    >
                        <option value="all">All Statuses</option>
                        <option value={BookingStatus.PENDING}>Pending</option>
                        <option value={BookingStatus.COMPLETED}>Completed</option>
                    </select>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="p-3">User</th>
                                <th className="p-3">Console</th>
                                <th className="p-3">Date & Time</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map(booking => (
                                <tr key={booking.id} className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="p-3">{booking.userName}</td>
                                    <td className="p-3">{booking.consoleName}</td>
                                    <td className="p-3">{booking.date} @ {booking.timeSlot}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${booking.status === BookingStatus.PENDING ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        {booking.status === BookingStatus.PENDING && (
                                            <Button size="sm" onClick={() => handleMarkComplete(booking.id)}>Mark Complete</Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {filteredBookings.length === 0 && <p className="text-center p-4">No bookings found.</p>}
            </Card>
        </div>
    );
};

export default AdminBookings;
