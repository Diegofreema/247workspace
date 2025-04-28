import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import React from 'react';

import { StatusEnum, TicketStatus } from '@/types';
import { IconBriefcase, IconListCheck, IconUser } from '@tabler/icons-react';
import { useDataFilters, useTicketFilters } from '@/lib/nuqs/use-data-filter';
import { ErrorComponent } from '@/components/ui/error-component';
import { FlexBox } from '@/components/custom/flex-box';
import { ReusableSkeleton } from '@/components/skeletons/link-skeleton';
import { ShadCnSelect } from '@/components/form/ShandCnSelect';

type Props = {
  allAssignees: { label: string; value: string }[];
};

export const TicketFilter = ({ allAssignees }: Props) => {
  const workspaceId = useWorkspaceId();

  const [{ assigneeId, status }, setFilters] = useTicketFilters();

  const {
    data: members,
    isPending: isPendingMembers,
    isError: isErrorMembers,
    refetch: refetchMembers,
  } = useGetMembers({ workspaceId });

  const isLoading = isPendingMembers;
  const isError = isErrorMembers;

  const retry = () => {
    refetchMembers();
  };
  if (isError) {
    return (
      <div className="w-full flex justify-center items-center">
        <ErrorComponent message="Failed to fetch data" reset={retry} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <FlexBox gap={2} flexDir={{ base: 'column', md: 'row' }}>
        {Array(2).map((_, index) => (
          <ReusableSkeleton key={index} width={{ base: '100%', md: '150px' }} />
        ))}
      </FlexBox>
    );
  }

  const onStatusChange = (value: string) => {
    setFilters({
      status: value === 'all' ? null : (value as TicketStatus),
    });
  };
  const onAssigneeChange = (value: string) => {
    setFilters({
      assigneeId: value === 'all' ? null : value,
    });
  };

  return (
    <FlexBox gap={2} flexDir={{ base: 'column', md: 'row' }}>
      <ShadCnSelect
        placeholder="Select status"
        onValueChange={onStatusChange}
        data={statusData}
        value={status ?? undefined}
        disabled={false}
        icon={IconListCheck}
      />
      <ShadCnSelect
        placeholder="All assignees"
        onValueChange={onAssigneeChange}
        data={[{ label: 'All assignees', value: 'all' }, ...allAssignees]}
        value={assigneeId ?? undefined}
        disabled={false}
        icon={IconUser}
      />
    </FlexBox>
  );
};

const statusData = [
  { label: 'All statuses', value: 'all' },
  { label: 'Unassigned', value: TicketStatus.UNASSIGNED },
  { label: 'Todo', value: TicketStatus.TODO },
  { label: 'In progress', value: TicketStatus.IN_PROGRESS },
  { label: 'In review', value: TicketStatus.IN_REVIEW },
  { label: 'Resolved', value: TicketStatus.RESOLVED },
];
