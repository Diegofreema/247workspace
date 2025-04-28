import { CreateTicketForm } from '@/components/form/create-ticket-form';
import { ReusableSkeleton } from '@/components/skeletons/link-skeleton';
import { useCurrentUser } from '@/features/auth/api/use-current-user';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetProfiles } from '@/features/members/api/use-profile';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { Stack } from '@chakra-ui/react';

const array = Array(7).fill(0);
export const CreateTicketFormWrapper = () => {
  const workspaceId = useWorkspaceId();

  const {
    data,
    isPending: isPendingProfile,
    isError: isErrorProfile,
  } = useCurrentUser();
  const {
    data: profiles,
    isPending: isPendingProfiles,
    isError: isErrorProfiles,
  } = useGetProfiles({
    workspaceId,
  });

  const isLoading = isPendingProfile || isPendingProfiles;
  const isError = isErrorProfile || isErrorProfiles;

  if (isError) {
    throw new Error('Error getting projects and profiles');
  }
  if (isLoading) {
    return (
      <Stack gap={4}>
        {array.map((_, i) => {
          const isLast = i === array.length - 1;
          return <ReusableSkeleton key={i} height={isLast ? '60px' : '30px'} />;
        })}
      </Stack>
    );
  }
  const { profile } = data;

  const memberOptions = profiles?.documents.map((p) => ({
    label: p.name,
    value: p.$id,
  }));
  return (
    <CreateTicketForm
      profileId={profile?.$id || ''}
      memberOptions={memberOptions}
    />
  );
};
