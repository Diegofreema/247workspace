import { create } from 'zustand';

type Props = {
  name: string;
  setValue: (values: string) => void;
  clear: () => void;
};

export const useEditWorkspaceFolderStore = create<Props>((set) => ({
  name: '',
  setValue: (values: string) => set({ name: values }),
  clear: () => set({ name: '' }),
}));
export const useEditProjectFolderStore = create<Props>((set) => ({
  name: '',
  setValue: (values: string) => set({ name: values }),
  clear: () => set({ name: '' }),
}));
