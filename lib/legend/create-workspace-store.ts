import { observable } from '@legendapp/state';
type CreateWorkspaceStore = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const createWorkspaceModal$ = observable<CreateWorkspaceStore>({
  isOpen: false,
  setOpen: (value) => {
    createWorkspaceModal$.isOpen.set(value);
  },
});
