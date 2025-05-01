import { observable } from '@legendapp/state';
type Props = {
  name: string;
  setValues: (values: string) => void;
  clear: () => void;
};

export const editWorkspaceFolder$ = observable<Props>({
  name: '',
  setValues: (name) => {
    editWorkspaceFolder$.name.set(name);
  },
  clear: () => {
    editWorkspaceFolder$.name.set('');
  },
});
