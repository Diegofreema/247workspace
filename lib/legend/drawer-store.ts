import { observable } from '@legendapp/state';
type DrawerStore = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const drawerStore$ = observable<DrawerStore>({
  isOpen: false,
  setOpen: (value) => {
    drawerStore$.isOpen.set(value);
  },
});
