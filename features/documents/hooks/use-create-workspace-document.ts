import { parseAsString, useQueryState } from 'nuqs';

export const useCreateWorkspaceDocumentModalController = () => {
  const [folderId, setFolderId] = useQueryState(
    'create-workspace-document',
    parseAsString
  );

  const open = (id: string) => setFolderId(id);
  const close = () => setFolderId(null);
  return { folderId, open, close, setFolderId };
};
