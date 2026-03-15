import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  address?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

// ---------------------------------------------------------
// ចំណុចសំខាន់៖ អ្នកគួរតែជំនួស Mock ទាំងនេះជាមួយ API ពិតប្រាកដ
// ---------------------------------------------------------

const mockLogin = async (email: string, password: string): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  if (password.length < 6) {
    throw new Error('Invalid credentials (Password too short)');
  }
  
  return {
    id: "cust_" + Math.random().toString(36).substring(7),
    email: email.toLowerCase(),
    name: email.split('@')[0],
  };
};

const mockSignup = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  
  return {
    id: "cust_" + Math.random().toString(36).substring(7),
    email: email.toLowerCase(),
    name,
  };
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const user = await mockLogin(email, password);
          set({ user, isAuthenticated: true });
        } catch (error: any) {
          throw error;
        }
      },

      signup: async (name: string, email: string, password: string) => {
        try {
          const user = await mockSignup(name, email, password);
          set({ user, isAuthenticated: true });
        } catch (error: any) {
          throw error;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
        // ប្រសិនបើចង់ Clear របស់ផ្សេងទៀតពេល Logout អាចដាក់នៅទីនេះ
        localStorage.removeItem('auth-storage'); 
      },

      updateProfile: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    }),
    {
      name: 'auth-storage', // ឈ្មោះ Key ក្នុង LocalStorage
    }
  )
);