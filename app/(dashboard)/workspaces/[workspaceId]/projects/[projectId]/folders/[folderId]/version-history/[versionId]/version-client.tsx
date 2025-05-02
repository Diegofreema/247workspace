'use client';

import { useVersionId } from '@/features/documents/hooks/useVersionId';

export const ProjectVersionClient = () => {
  const versionId = useVersionId();

  return <div>ProjectVersionClient : {versionId}</div>;
};
