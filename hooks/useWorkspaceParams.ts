'use client';

import { useParams } from 'next/navigation';

export const useWorkspaceParams = () => {
  const { workspaceId } = useParams();
  return { workspaceId };
};
