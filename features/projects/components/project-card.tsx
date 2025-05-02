import { FlexBox } from '@/components/custom/flex-box';
import { EmptyUi } from '@/components/ui/empty-ui';
import { colors } from '@/constants';
import { ProjectsWithTasks, StatusEnum } from '@/types';
import { AvatarGroup, For, Stack, Status } from '@chakra-ui/react';
import { EllipsisVertical } from 'lucide-react';
import { ProjectAction } from './project-action';
import { ProfileAvatar } from '@/components/ui/profile-avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {
  project: ProjectsWithTasks;
};

export const ProjectCard = ({ project }: Props) => {
  const todoTasksLength = project.tasks.filter(
    (task) => task.status === StatusEnum.TODO
  ).length;
  const reviewTasksLength = project.tasks.filter(
    (task) => task.status === StatusEnum.IN_REVIEW
  ).length;
  const progressTasksLength = project.tasks.filter(
    (task) => task.status === StatusEnum.IN_PROGRESS
  ).length;
  const backlogTasksLength = project.tasks.filter(
    (task) => task.status === StatusEnum.BACKLOG
  ).length;
  const doneTasksLength = project.tasks.filter(
    (task) => task.status === StatusEnum.DONE
  ).length;

  const tasks = [
    {
      title: 'Backlog',
      value: backlogTasksLength,
      variant: 'pink',
    },
    { title: 'Todo', value: todoTasksLength, variant: 'red' },
    {
      title: 'In progress',
      value: progressTasksLength,
      variant: 'yellow',
    },
    {
      title: 'In review',
      value: reviewTasksLength,
      variant: 'blue',
    },
    { title: 'Done', value: doneTasksLength, variant: 'green' },
  ];

  const max = tasks.find(
    (item) => item.value === Math.max(...tasks.map((item) => item.value))
  );
  const assignees = project.tasks.map((task) => task.assignee);

  return (
    <Card className="max-h-fit bg-white border-0">
      <CardHeader className="mb-5">
        <FlexBox
          justifyContent={'space-between'}
          alignItems={'center'}
          borderLeftWidth={10}
          borderLeftColor={max?.variant}
          paddingLeft={2}
        >
          <CardTitle className="text-black font-bold">{project.name}</CardTitle>
          <ProjectAction projectId={project.$id}>
            <EllipsisVertical className="size-5 text-black cursor-pointer -mr-2" />
          </ProjectAction>
        </FlexBox>
      </CardHeader>
      <CardContent>
        <Stack gap={3} width={'100%'}>
          <For each={tasks} fallback={<EmptyUi text="No tasks yet" />}>
            {(item, index) => (
              <FlexBox
                key={index}
                alignItems={'center'}
                justifyContent={'space-between'}
                width="100%"
              >
                <FlexBox alignItems={'center'} gap={2}>
                  <Status.Root colorPalette={item.variant}>
                    <Status.Indicator />
                  </Status.Root>
                  <p className="text-md font-bold text-black">{item.title}</p>
                </FlexBox>
                <p className="text-md font-bold text-black">{item.value}</p>
              </FlexBox>
            )}
          </For>
        </Stack>
      </CardContent>
      <CardFooter>
        {assignees.length > 0 && (
          <AvatarGroup gap="0" spaceX="-3" size="lg">
            {assignees.map((assignee, index) => (
              <ProfileAvatar
                key={index}
                name={assignee?.name!}
                imageUrl={assignee?.avatarUrl}
              />
            ))}
          </AvatarGroup>
        )}
        {assignees.length === 0 && <div className="h-8 w-8" />}
      </CardFooter>
    </Card>
  );
};
