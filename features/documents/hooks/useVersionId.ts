'use client';
import { useParams } from 'next/navigation';

export const useVersionId = () => {
  const { versionId } = useParams();
  return versionId as string;
};
