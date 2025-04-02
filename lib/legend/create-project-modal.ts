import { observable } from '@legendapp/state';
type CreateProjectStore = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const createProjectModal$ = observable<CreateProjectStore>({
  isOpen: false,
  setOpen: (value) => {
    createProjectModal$.isOpen.set(value);
  },
});
