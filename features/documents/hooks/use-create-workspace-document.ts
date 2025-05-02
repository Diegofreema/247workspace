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
export const useCreateProjectDocumentModalController = () => {
  const [folderId, setFolderId] = useQueryState(
    'create-project-document',
    parseAsString
  );

  const open = (id: string) => setFolderId(id);
  const close = () => setFolderId(null);
  return { folderId, open, close, setFolderId };
};
