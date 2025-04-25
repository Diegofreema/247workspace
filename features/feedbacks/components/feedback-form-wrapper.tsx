'use client';
import { CreateFeedbackForm } from '@/components/form/create-feedback-form';
import { ReusableSkeleton } from '@/components/skeletons/link-skeleton';
import { useCurrentUser } from '@/features/auth/api/use-current-user';
import { Stack } from '@chakra-ui/react';
import React from 'react';

export const FeedbackWrapper = () => {
  const { data, isPending, isError } = useCurrentUser();
  if (isError) {
    throw new Error('Failed to load data');
  }
  if (isPending) {
    return (
      <Stack mt={5}>
        <ReusableSkeleton height="150px" />
      </Stack>
    );
  }

  const { profile } = data;
  return <CreateFeedbackForm profileId={profile?.$id as string} />;
};
