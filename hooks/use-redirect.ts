import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  url: string;
  getUrl: (value: string) => void;
  clearUrl: () => void;
};

export const useRedirectUrl = create<Store>((set) => ({
  url: '',
  getUrl: (value: string) => set(() => ({ url: value })),
  clearUrl: () => set(() => ({ url: '' })),
}));
