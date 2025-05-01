import { parseAsString, useQueryState } from 'nuqs';

export const useVersionModalController = () => {
  const [versionId, setVersionId] = useQueryState('versionId', parseAsString);

  const open = (id: string) => setVersionId(id);
  const close = () => setVersionId(null);
  return { versionId, open, close, setVersionId };
};
