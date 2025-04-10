import { observable } from '@legendapp/state';
type RedirectUrlStore = {
  link: string;
  setLink: (value: string) => void;
};

export const redirectUrlStore$ = observable<RedirectUrlStore>({
  link: '',
  setLink: (value) => {
    redirectUrlStore$.link.set(value);
  },
});
