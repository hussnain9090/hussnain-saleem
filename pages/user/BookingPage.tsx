
import React, { useState, useEffect } from 'react';
import { Console, Booking } from '../../types';
import { MOCK_CONSOLES, MOCK_BOOKINGS, TIME_SLOTS } from '../../constants';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const BookingPage: React.FC = () => {
  const [consoles] = useState<Console[]>(MOCK_CONSOLES);
  const [bookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [selectedConsole, setSelectedConsole] = useState<Console | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const isSlotBooked = (consoleId: string, date: string, timeSlot: string) => {
    return bookings.some(
      booking =>
        booking.consoleId === consoleId &&
        booking.date === date &&
        booking.timeSlot === timeSlot
    );
  };
  
  const handleBooking = () => {
    if (selectedConsole && selectedDate && selectedTimeSlot) {
      // In a real app, this would be an API call to create the booking.
      // Here we just show a success message and redirect.
      setNotification(`Successfully booked ${selectedConsole.name} for ${selectedDate} at ${selectedTimeSlot}!`);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Book a Console</h1>
      {notification && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p>{notification}</p>
        </div>
      )}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Step 1: Select Console */}
        <Card className="lg:col-span-1">
          <h2 className="text-xl font-bold mb-4">1. Select a Console</h2>
          <div className="space-y-3">
            {consoles.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedConsole(c)}
                disabled={!c.isAvailable}
                className={`w-full text-left p-3 rounded-md transition-all border-2 ${
                  selectedConsole?.id === c.id ? 'border-brand-primary bg-orange-50 dark:bg-orange-900/20' : 'border-transparent bg-gray-100 dark:bg-gray-800'
                } ${c.isAvailable ? 'hover:border-brand-secondary cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
              >
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{c.type}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Step 2 & 3: Select Date & Time */}
        <Card className="lg:col-span-2">
          {selectedConsole ? (
            <>
              <h2 className="text-xl font-bold mb-4">2. Select Date & Time for <span className="text-brand-primary">{selectedConsole.name}</span></h2>
              <div className="mb-6">
                <label htmlFor="booking-date" className="block text-sm font-medium mb-1">Date</label>
                <input
                  id="booking-date"
                  type="date"
                  min={today}
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-full md:w-1/2 p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Available Time Slots</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {TIME_SLOTS.map(slot => {
                    const isBooked = isSlotBooked(selectedConsole.id, selectedDate, slot);
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        disabled={isBooked}
                        className={`p-3 rounded-md text-sm font-semibold transition-colors ${
                          isBooked 
                            ? 'bg-red-200 dark:bg-red-900 text-red-500 cursor-not-allowed' 
                            : selectedTimeSlot === slot
                            ? 'bg-brand-primary text-white'
                            : 'bg-gray-200 dark:bg-gray-700 hover:bg-brand-secondary hover:text-dark-bg'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedTimeSlot && (
                <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold">Booking Summary</h3>
                    <p>Console: <span className="font-semibold text-brand-secondary">{selectedConsole.name}</span></p>
                    <p>Date: <span className="font-semibold">{selectedDate}</span></p>
                    <p>Time: <span className="font-semibold">{selectedTimeSlot}</span></p>
                    <Button onClick={handleBooking} className="mt-4">Confirm Booking</Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Please select a console to see available slots.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BookingPage;
