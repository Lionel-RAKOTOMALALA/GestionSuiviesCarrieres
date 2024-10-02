import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      auth: {
        username: '',
        active: false,
      },
      setUsername: (name) =>
        set((state) => ({
          auth: {
            ...state.auth,
            username: name,
          },
        })),
      setActive: (status) =>
        set((state) => ({
          auth: {
            ...state.auth,
            active: status,
          },
        })),
    }),
    {
      name: 'auth-storage', // Nom de l'élément dans le localStorage
      getStorage: () => localStorage, // Persiste dans le localStorage
    }
  )
);
