import { create } from 'zustand';

interface SubjectStore {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string | number;
  setId: (id: string | number) => void;
}

export const useSubjectStore = create<SubjectStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
  id: '',
  setId: (id: string | number) => set({ id }),
}));
