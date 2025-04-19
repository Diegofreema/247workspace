import { parseAsInteger, useQueryState } from 'nuqs';

export const useOffsetProject = () => {
  const [offset, setOffset] = useQueryState(
    'project-offset',
    parseAsInteger.withDefault(0)
  );

  return { offset, setOffset };
};
