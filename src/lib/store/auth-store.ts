import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

// Mock login function (replace with real API call)
const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Mock validation
  if (password.length < 6) {
    throw new Error('Invalid credentials');
  }
  
  return {
    id: Math.random().toString(36).substring(7),
    email,
    name: email.split('@')[0],
  };
};

// Mock signup function (replace with real API call)
const mockSignup = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Mock validation
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  
  return {
    id: Math.random().toString(36).substring(7),
    email,
    name,
  };
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        const user = await mockLogin(email, password);
        set({ user, isAuthenticated: true });
      },
      signup: async (name: string, email: string, password: string) => {
        const user = await mockSignup(name, email, password);
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateProfile: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
