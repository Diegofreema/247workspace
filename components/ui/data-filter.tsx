import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import React from 'react';
import { ErrorComponent } from './error-component';
import { FlexBox } from '../custom/flex-box';
import { ShadCnSelect } from '../form/ShandCnSelect';
import { StatusEnum } from '@/types';
import { IconListCheck } from '@tabler/icons-react';
import { useDataFilters } from '@/lib/nuqs/use-data-filter';

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
    return null;
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

  return (
    <FlexBox>
      <ShadCnSelect
        placeholder="Select status"
        onValueChange={onStatusChange}
        data={statusData}
        value={status ?? undefined}
        disabled={false}
        icon={IconListCheck}
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
