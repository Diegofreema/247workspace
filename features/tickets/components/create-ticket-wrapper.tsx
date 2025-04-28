import { CreateTicketForm } from '@/components/form/create-ticket-form';
import { ReusableSkeleton } from '@/components/skeletons/link-skeleton';
import { useCurrentUser } from '@/features/auth/api/use-current-user';
import { useGetMembers } from '@/features/members/api/use-get-members';
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
    data: members,
    isPending: isPendingMembers,
    isError: isErrorMembers,
  } = useGetMembers({
    workspaceId,
  });

  const isLoading = isPendingProfile || isPendingMembers;
  const isError = isErrorProfile || isErrorMembers;

  if (isError) {
    throw new Error('Error getting projects and members');
  }
  if (isLoading) {
    return (
      <Stack gap={4}>
        {array.map((_, i) => (
          <ReusableSkeleton
            key={i}
            height={i === array.at(-1) ? '30px' : '10px'}
          />
        ))}
      </Stack>
    );
  }
  const { profile } = data;

  const memberOptions = members?.documents.map((member) => ({
    label: member.name,
    value: member.$id,
  }));
  return (
    <CreateTicketForm
      profileId={profile?.$id || ''}
      memberOptions={memberOptions}
    />
  );
};
