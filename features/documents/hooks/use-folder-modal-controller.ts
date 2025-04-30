import { parseAsBoolean, useQueryState } from 'nuqs';

export const useFolderModalController = () => {
  const [isOpen, setIsOpen] = useQueryState(
    'folder-modal',
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close };
};
