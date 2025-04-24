'use client';

import { useParams } from 'next/navigation';

export const useProfileId = () => {
  const { profileId } = useParams();
  return profileId as string;
};
