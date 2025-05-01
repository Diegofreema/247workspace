'use client';

import { useParams } from 'next/navigation';

export const useFolderId = () => {
  const { folderId } = useParams();

  return folderId as string;
};
