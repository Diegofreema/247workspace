'use client';

import { FlexBox } from '@/components/custom/flex-box';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Loading } from '@/components/ui/loading';
import { useGetProjectsWithTasks } from '@/features/projects/api/use-get-projects-with-tasks';
import { AllProjects } from '@/features/projects/components/all-projects';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useOffsetProject } from '@/lib/nuqs/use-project-offset';

export const AllProjectPage = () => {
  const workspaceId = useWorkspaceId();
  const { offset, setOffset } = useOffsetProject();
  const { data, isError, isPending, isRefetching } = useGetProjectsWithTasks({
    workspaceId,
    offset: offset.toString(),
  });
  if (isError) throw new Error('Failed to get projects');
  if (isPending) return <Loading />;
  const onClick = () => {
    setOffset((prev) => prev + 5);
  };
  const isNextPage = data.documents.length < data.total;
  return (
    <div className="h-full flex-1">
      <Heading title="Projects" subTitle="Manage all your projects here" />
      <AllProjects projects={data.documents} />
      {isNextPage && (
        <FlexBox justifyContent={'center'} width={'full'} mt={10}>
          <Button onClick={onClick} disabled={isRefetching}>
            Load more
          </Button>
        </FlexBox>
      )}
    </div>
  );
};
