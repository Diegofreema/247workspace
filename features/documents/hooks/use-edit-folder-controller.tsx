import { parseAsString, useQueryState } from 'nuqs';

export const useEditFolderModalController = () => {
  const [folderId, setFolderId] = useQueryState('edit-folder', parseAsString);

  const open = (id: string) => setFolderId(id);
  const close = () => setFolderId(null);
  return { folderId, open, close, setFolderId };
};
