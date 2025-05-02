import { parseAsInteger, useQueryState } from 'nuqs';

export const useOffsetWorkspaceFolder = () => {
  const [more, setMore] = useQueryState(
    'workspace-folder-more',
    parseAsInteger.withDefault(0)
  );

  return { more, setMore };
};

export const useOffsetProjectFolder = () => {
  const [more, setMore] = useQueryState(
    'project-folder-more',
    parseAsInteger.withDefault(0)
  );

  return { more, setMore };
};
