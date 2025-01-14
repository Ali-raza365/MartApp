import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';

interface AuthState {
    user: Record<string, any> | string | null;
    currentOrder: Record<string, any> | string | null;
    setUser: (user: string | null) => void;
    setCurrentOrder: (order: string | null) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            currentOrder: null,
            setUser: (user) => set({ user }),
            setCurrentOrder: (order) => set({ currentOrder: order }),
            logout: () => set({ user: null, currentOrder: null }),

        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => mmkvStorage),
        }
    ),
);

export default useAuthStore;