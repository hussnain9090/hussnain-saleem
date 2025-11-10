
import { Console, Booking, ContactMessage, BookingStatus } from './types';

export const MOCK_CONSOLES: Console[] = [
  { id: 'ps5-1', name: 'PS5-01', type: 'PlayStation 5', isAvailable: true },
  { id: 'ps5-2', name: 'PS5-02', type: 'PlayStation 5', isAvailable: true },
  { id: 'xbox-1', name: 'Xbox-01', type: 'Xbox Series X', isAvailable: true },
  { id: 'switch-1', name: 'Switch-01', type: 'Nintendo Switch', isAvailable: false },
];

export const MOCK_BOOKINGS: Booking[] = [
  { 
    id: 'booking-1', 
    userId: 'user-1', 
    userName: 'John Doe',
    consoleId: 'ps5-1', 
    consoleName: 'PS5-01',
    date: '2024-08-15', 
    timeSlot: '14:00 - 15:00', 
    status: BookingStatus.PENDING,
    createdAt: new Date().toISOString() 
  },
  { 
    id: 'booking-2', 
    userId: 'user-2', 
    userName: 'Jane Smith',
    consoleId: 'xbox-1', 
    consoleName: 'Xbox-01',
    date: '2024-08-15', 
    timeSlot: '16:00 - 17:00', 
    status: BookingStatus.PENDING,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  { 
    id: 'booking-3', 
    userId: 'user-1', 
    userName: 'John Doe',
    consoleId: 'switch-1', 
    consoleName: 'Switch-01',
    date: '2024-08-14', 
    timeSlot: '18:00 - 19:00', 
    status: BookingStatus.COMPLETED,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString()
  },
];

export const MOCK_MESSAGES: ContactMessage[] = [
    {
        id: 'msg-1',
        name: 'Curious Gamer',
        email: 'gamer@email.com',
        message: 'Do you have the latest Spider-Man 2 game available on PS5?',
        createdAt: new Date().toISOString(),
        replied: false,
    },
    {
        id: 'msg-2',
        name: 'Party Planner',
        email: 'party@email.com',
        message: 'Can I book multiple consoles for a birthday party?',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        replied: true,
        aiReply: 'Thank you for your inquiry about group bookings. We would be delighted to host your birthday party! To best accommodate your request, please let us know the desired date, time, and the number of guests so we can arrange the perfect gaming experience for you. We look forward to celebrating with you!'
    }
]

export const TIME_SLOTS = [
    '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00',
    '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00',
    '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00',
    '19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00',
];
