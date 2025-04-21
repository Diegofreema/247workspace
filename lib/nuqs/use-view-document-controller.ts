import { parseAsString, useQueryState } from 'nuqs';

export const useViewDocumentModalController = () => {
  const [documentId, setDocumentId] = useQueryState(
    'view-document',
    parseAsString
  );

  const open = (id: string) => setDocumentId(id);
  const close = () => setDocumentId(null);
  return { documentId, open, close, setDocumentId };
};
