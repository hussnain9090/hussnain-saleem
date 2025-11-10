
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<User | null>;
  logout: () => void;
  signup: (name: string, email: string, pass: string) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data to seed the DB
const MOCK_ADMIN: User = { id: 'admin-1', name: 'Admin', email: 'admin@gamefire.com', role: Role.ADMIN };
const MOCK_USER: User = { id: 'user-1', name: 'John Doe', email: 'user@gamefire.com', role: Role.USER };
// In a real app, passwords would be hashed. For demo purposes, we store them plaintext.
const MOCK_PASSWORDS = {
    'admin@gamefire.com': 'admin123',
    'user@gamefire.com': 'user123'
};

const USERS_DB_KEY = 'gamefire_users';
const PASSWORDS_DB_KEY = 'gamefire_passwords';

// Initialize a mock DB in localStorage if it doesn't exist
const initializeUsersDB = () => {
    if (!localStorage.getItem(USERS_DB_KEY)) {
        const initialUsers = [MOCK_ADMIN, MOCK_USER];
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(initialUsers));
        localStorage.setItem(PASSWORDS_DB_KEY, JSON.stringify(MOCK_PASSWORDS));
    }
};

initializeUsersDB();

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a logged-in user in session storage
    try {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
        console.error("Failed to parse user from session storage", error)
        sessionStorage.removeItem('user');
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<User | null> => {
    setLoading(true);
    return new Promise(resolve => {
        setTimeout(() => {
            const users: User[] = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
            const passwords = JSON.parse(localStorage.getItem(PASSWORDS_DB_KEY) || '{}');
            
            const foundUser = users.find(u => u.email === email);
            
            if (foundUser && passwords[email] === pass) {
                setUser(foundUser);
                sessionStorage.setItem('user', JSON.stringify(foundUser));
                setLoading(false);
                resolve(foundUser);
            } else {
                setLoading(false);
                resolve(null);
            }
        }, 1000);
    });
  };
  
  const signup = async (name: string, email: string, pass: string): Promise<User | null> => {
      setLoading(true);
      return new Promise(resolve => {
          setTimeout(() => {
              const users: User[] = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
              const passwords = JSON.parse(localStorage.getItem(PASSWORDS_DB_KEY) || '{}');

              if (users.some(u => u.email === email)) {
                  // User already exists
                  setLoading(false);
                  resolve(null); // Indicate failure due to existing email
                  return;
              }

              const newUser: User = { id: `user-${Date.now()}`, name, email, role: Role.USER };
              
              users.push(newUser);
              passwords[email] = pass;
              
              localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
              localStorage.setItem(PASSWORDS_DB_KEY, JSON.stringify(passwords));

              setUser(newUser);
              sessionStorage.setItem('user', JSON.stringify(newUser));
              setLoading(false);
              resolve(newUser);
          }, 1000);
      });
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
