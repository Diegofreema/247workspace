import { observable } from '@legendapp/state';
type CreateWorkspaceModal = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const createWorkspaceModal$ = observable<CreateWorkspaceModal>({
  isOpen: false,
  setOpen: (value) => {
    createWorkspaceModal$.isOpen.set(value);
  },
});
