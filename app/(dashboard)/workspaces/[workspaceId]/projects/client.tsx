'use client';

import { Heading } from '@/components/ui/heading';
import { Loading } from '@/components/ui/loading';
import { useGetProjectsWithTasks } from '@/features/projects/api/use-get-projects-with-tasks';
import { AllProjects } from '@/features/projects/components/all-projects';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';

export const AllProjectPage = () => {
  const workspaceId = useWorkspaceId();
  const { data, isError, isPending } = useGetProjectsWithTasks({ workspaceId });
  if (isError) throw new Error('Failed to get projects');
  if (isPending) return <Loading />;
  console.log(data);

  return (
    <div className="h-full">
      <Heading title="Projects" subTitle="Manage all your projects here" />
      <AllProjects projects={data.documents} total={data.total} />
    </div>
  );
};
