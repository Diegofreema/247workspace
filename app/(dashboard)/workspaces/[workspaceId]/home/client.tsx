'use client';

import { FlexBox } from '@/components/custom/flex-box';
import { Analytics } from '@/components/ui/analytics';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { ProfileAvatar } from '@/components/ui/profile-avatar';
import { Separator } from '@/components/ui/separator';
import { Tooltip } from '@/components/ui/tooltip';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useGetTasks } from '@/features/tasks/api/use-get-tasks';
import { useGetWorkspaceAnalytics } from '@/features/workspaces/api/use-create-workspace-analytics';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useCreateProjectModalController } from '@/lib/nuqs/use-create-project';
import { useCreateTaskModalController } from '@/lib/nuqs/use-create-task';
import { Profile, Project, TaskWithProjectAndAssignee } from '@/types';
import { trimText } from '@/utils/helper';
import { formatDistanceToNow } from 'date-fns';
import { CalendarCheckIcon, PlusIcon, Settings } from 'lucide-react';
import { Link } from 'next-view-transitions';

export const HomeClient = () => {
  const workspaceId = useWorkspaceId();

  const {
    data: analytics,
    isPending: isPendingAnalytics,
    isError: isErrorAnalytics,
  } = useGetWorkspaceAnalytics({ workspaceId });
  const {
    data: tasks,
    isError: isErrorTasks,
    isPending: isPendingTasks,
  } = useGetTasks({ workspaceId });
  const {
    data: projects,
    isPending: isPendingProjects,
    isError: isErrorProjects,
  } = useGetProjects({ workspaceId });
  const {
    data: members,
    isPending: isPendingMembers,
    isError: isErrorMembers,
  } = useGetMembers({ workspaceId });

  const isLoading =
    isPendingAnalytics ||
    isPendingTasks ||
    isPendingProjects ||
    isPendingMembers;
  const isError =
    isErrorAnalytics || isErrorTasks || isErrorProjects || isErrorMembers;

  if (isError) {
    throw new Error('Failed to get workspace analytics');
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <Analytics data={analytics} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TaskList tasks={tasks.documents} total={tasks.total} />
        <ProjectList projects={projects.documents} total={projects.total} />
        <MemberList members={members.documents} total={members.total} />
      </div>
    </div>
  );
};

type Props = {
  tasks: TaskWithProjectAndAssignee[];
  total: number;
};

type ProjectProps = {
  projects: Project[];
  total: number;
};

type MemberProps = {
  members: Profile[];
  total: number;
};

export const TaskList = ({ tasks, total }: Props) => {
  const { open: createTask } = useCreateTaskModalController();
  const workspaceId = useWorkspaceId();
  return (
    <div className="flex flex-col gap-y-4 col-span-1 flex-1">
      <div className="bg-white text-black rounded-lg p-4 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tasks ({total})</p>
          <Tooltip content="Create a new task">
            <Button
              variant={'ghost'}
              size={'icon'}
              onClick={createTask}
              className="hover:bg-purple transition group"
            >
              <PlusIcon className="size-4 text-neutral-400 group-hover:text-white" />
            </Button>
          </Tooltip>
        </div>
        <Separator className="my-4" />
        <ul className="flex flex-col gap-y-4">
          {tasks.slice(0, 4).map((task) => (
            <li key={task.$id}>
              <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                <Card className="shadow-none rounded-lg group transition bg-white text-black hover:bg-purple hover:text-white">
                  <CardContent className="p-4 ">
                    <p className="text-lg font-medium truncate">{task.name}</p>
                    <div className="flex items-center gap-x-2">
                      <p>{task.project?.name}</p>
                      <div className="size-1 rounded-full bg-neutral-300" />
                      <div className="text-sm text-muted-foreground flex items-center">
                        <CalendarCheckIcon className="size-3 mr-1" />
                        <span className="truncate">
                          {formatDistanceToNow(new Date(task.dueDate))}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No tasks found
          </li>
        </ul>
        {tasks.length > 3 && (
          <Button
            variant={'ghost'}
            className="mt-4 w-full hover:bg-purple"
            asChild
          >
            <Link href={`/workspaces/${workspaceId}/tasks`}>Show all</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export const ProjectList = ({ projects, total }: ProjectProps) => {
  const { open: createProject } = useCreateProjectModalController();
  const workspaceId = useWorkspaceId();
  return (
    <div className="flex flex-col gap-y-4 col-span-1 flex-1">
      <div className="bg-white text-black rounded-lg p-4 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Projects ({total})</p>
          <Tooltip content="Create a new project">
            <Button
              variant={'ghost'}
              size={'icon'}
              onClick={createProject}
              className="hover:bg-purple transition group"
            >
              <PlusIcon className="size-4 text-neutral-400 group-hover:text-white" />
            </Button>
          </Tooltip>
        </div>
        <Separator className="my-4" />
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.slice(0, 4).map((project) => (
            <li key={project.$id}>
              <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                <Card className="shadow-none rounded-lg group transition bg-white text-black hover:bg-purple hover:text-white">
                  <CardContent className="p-4 flex items-center gap-x-2.5">
                    <ProfileAvatar
                      name={project.name}
                      imageUrl={project.imageUrl}
                    />
                    <p className="text-lg font-medium truncate">
                      {project.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>

        {total === 0 && (
          <p className="text-sm text-muted-foreground text-center  w-full">
            No projects found
          </p>
        )}
      </div>
    </div>
  );
};
export const MemberList = ({ members, total }: MemberProps) => {
  const workspaceId = useWorkspaceId();
  return (
    <div className="flex flex-col gap-y-4 col-span-1 flex-1">
      <div className="bg-white text-black rounded-lg p-4 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Members ({total})</p>
          <Tooltip content="Create a new project">
            <Button
              variant={'ghost'}
              size={'icon'}
              asChild
              className="hover:bg-purple transition group"
            >
              <Link href={`/workspaces/${workspaceId}/team`}>
                <Settings className="size-4 text-neutral-400 group-hover:text-white" />
              </Link>
            </Button>
          </Tooltip>
        </div>
        <Separator className="my-4" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.slice(0, 4).map((member) => (
            <li key={member.$id}>
              <Card className="shadow-none rounded-lg group transition bg-white text-black hover:bg-purple hover:text-white overflow-hidden">
                <CardContent className="p-3 flex flex-col items-center gap-x-2.5">
                  <ProfileAvatar
                    name={member.name}
                    imageUrl={member.avatarUrl}
                  />
                  <div className="flex flex-col items-center overflow-hidden">
                    <p className="font-medium line-clamp-1">{member.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {trimText(member.email, 20)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No member found
          </li>
        </ul>
      </div>
    </div>
  );
};
