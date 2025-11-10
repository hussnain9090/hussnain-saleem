
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export enum BookingStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
}

export interface Console {
  id: string;
  name: string;
  type: 'PlayStation 5' | 'Xbox Series X' | 'Nintendo Switch';
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  consoleId: string;
  consoleName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g., '14:00 - 15:00'
  status: BookingStatus;
  createdAt: string; // ISO string
  aiMessage?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string; // ISO string
  replied: boolean;
  aiReply?: string;
}
