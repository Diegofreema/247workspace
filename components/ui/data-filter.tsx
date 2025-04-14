import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import React from 'react';
import { ErrorComponent } from './error-component';
import { FlexBox } from '../custom/flex-box';
import { ShadCnSelect } from '../form/ShandCnSelect';
import { StatusEnum } from '@/types';
import { IconBriefcase, IconListCheck, IconUser } from '@tabler/icons-react';
import { useDataFilters } from '@/lib/nuqs/use-data-filter';
import { ReusableSkeleton } from '../skeletons/link-skeleton';
import { DatePicker } from './date-picker';

type Props = {
  hideProjectFilter?: boolean;
};

export const DataFilter = ({ hideProjectFilter }: Props) => {
  const workspaceId = useWorkspaceId();
  const [{ assigneeId, dueDate, projectId, status }, setFilters] =
    useDataFilters();
  const {
    data: projects,
    isPending: isPendingProjects,
    isError: isErrorProjects,
    refetch: refetchProjects,
  } = useGetProjects({ workspaceId });
  const {
    data: members,
    isPending: isPendingMembers,
    isError: isErrorMembers,
    refetch: refetchMembers,
  } = useGetMembers({ workspaceId });

  const isLoading = isPendingProjects || isPendingMembers;
  const isError = isErrorProjects || isErrorMembers;

  const retry = () => {
    refetchProjects();
    refetchMembers();
  };
  if (isError) {
    return <ErrorComponent message="Failed to fetch data" reset={retry} />;
  }

  if (isLoading) {
    return (
      <FlexBox gap={2} flexDir={{ base: 'column', md: 'row' }}>
        {[...Array(4)].map((_, index) => (
          <ReusableSkeleton key={index} width={{ base: '100%', md: '150px' }} />
        ))}
      </FlexBox>
    );
  }

  const membersOptions =
    members?.documents.map((member) => ({
      label: member.name,
      value: member.$id,
    })) || [];
  const projectsOptions =
    projects?.data.documents.map((project) => ({
      label: project.name,
      value: project.$id,
    })) || [];

  const onStatusChange = (value: string) => {
    setFilters({
      status: value === 'all' ? null : (value as StatusEnum),
    });
  };
  const onAssigneeChange = (value: string) => {
    setFilters({
      assigneeId: value === 'all' ? null : value,
    });
  };
  const onProjectChange = (value: string) => {
    setFilters({
      projectId: value === 'all' ? null : value,
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
        data={[{ label: 'All assignees', value: 'all' }, ...membersOptions]}
        value={assigneeId ?? undefined}
        disabled={false}
        icon={IconUser}
      />
      <ShadCnSelect
        placeholder="All projects"
        onValueChange={onProjectChange}
        data={[{ label: 'All Projects', value: 'all' }, ...projectsOptions]}
        value={projectId ?? undefined}
        disabled={false}
        icon={IconBriefcase}
      />
      <DatePicker
        className="h-9 w-full lg:w-auto"
        placeholder="Due date"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) => {
          setFilters({ dueDate: date ? date.toISOString() : null });
        }}
      />
    </FlexBox>
  );
};

const statusData = [
  { label: 'All statuses', value: 'all' },
  { label: 'Backlog', value: StatusEnum.BACKLOG },
  { label: 'Todo', value: StatusEnum.TODO },
  { label: 'In Progress', value: StatusEnum.IN_PROGRESS },
  { label: 'In Review', value: StatusEnum.IN_REVIEW },
  { label: 'Done', value: StatusEnum.DONE },
];
