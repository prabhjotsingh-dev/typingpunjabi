import { create } from 'zustand'

interface AppState {
  // Define your state variables here
  isLoading: boolean;
  
  // Define your actions here
  setIsLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}))
