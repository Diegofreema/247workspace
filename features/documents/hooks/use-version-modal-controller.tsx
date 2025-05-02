import { parseAsString, useQueryState } from 'nuqs';

export const useVersionModalController = () => {
  const [versionId, setVersionId] = useQueryState('versionId', parseAsString);

  const open = (id: string) => setVersionId(id);
  const close = () => setVersionId(null);
  return { versionId, open, close, setVersionId };
};
export const useProjectVersionModalController = () => {
  const [versionId, setVersionId] = useQueryState(
    'project-versionId',
    parseAsString
  );

  const open = (id: string) => setVersionId(id);
  const close = () => setVersionId(null);
  return { versionId, open, close, setVersionId };
};
