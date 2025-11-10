
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MOCK_BOOKINGS } from '../../constants';
import { Booking, BookingStatus } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { generateBookingMessage } from '../../services/geminiService';
import { Clipboard, Check } from 'lucide-react';

const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
    const [aiMessage, setAiMessage] = useState(booking.aiMessage || '');
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerateMessage = async () => {
        setIsLoading(true);
        const message = await generateBookingMessage(booking);
        setAiMessage(message);
        // In a real app, you would save this message to the booking record in the DB.
        booking.aiMessage = message; 
        setIsLoading(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(aiMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="w-full animate-slide-in-up">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-brand-secondary">{booking.consoleName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(booking.date).toLocaleDateString()} at {booking.timeSlot}
                    </p>
                </div>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${booking.status === BookingStatus.PENDING ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                    {booking.status}
                </span>
            </div>
            {booking.status === BookingStatus.PENDING && (
                <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="font-semibold mb-2">AI Generated Message:</h4>
                    {aiMessage ? (
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm">
                            <p className="whitespace-pre-wrap">{aiMessage}</p>
                            <div className="text-right mt-2">
                                <button onClick={handleCopy} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    {copied ? <Check size={16} className="inline text-green-500"/> : <Clipboard size={16} className="inline"/>}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Button onClick={handleGenerateMessage} disabled={isLoading} size="sm">
                            {isLoading ? 'Generating...' : 'Generate Confirmation Message'}
                        </Button>
                    )}
                </div>
            )}
        </Card>
    );
};


const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Simulate fetching bookings for the current user
    if (user) {
      const userBookings = MOCK_BOOKINGS.filter(b => b.userId === user.id);
      setBookings(userBookings);
    }
  }, [user]);

  const pendingBookings = bookings.filter(b => b.status === BookingStatus.PENDING);
  const completedBookings = bookings.filter(b => b.status === BookingStatus.COMPLETED);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-gray-600 dark:text-gray-400">Here's an overview of your bookings.</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-brand-primary pb-2">Active Bookings</h2>
        {pendingBookings.length > 0 ? (
          <div className="space-y-4">
            {pendingBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)}
          </div>
        ) : (
          <p>You have no active bookings.</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-500 pb-2">Booking History</h2>
        {completedBookings.length > 0 ? (
          <div className="space-y-4">
             {completedBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)}
          </div>
        ) : (
          <p>No past bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
