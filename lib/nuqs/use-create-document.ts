import { parseAsString, useQueryState } from 'nuqs';

export const useCreateDocumentModalController = () => {
  const [projectId, setProjectId] = useQueryState(
    'create-document',
    parseAsString
  );

  const open = (id: string) => setProjectId(id);
  const close = () => setProjectId(null);
  return { projectId, open, close, setProjectId };
};
