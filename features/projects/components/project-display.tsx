import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { colors } from '@/constants';
import { TaskViewSwitcher } from '@/features/tasks/components/tasks-view-switcher';
import { Project } from '@/types';
import { Stack } from '@chakra-ui/react';
import { EditActionMenu } from './edit-action-menu';
import { ProjectInnerItem } from './project-item';
import { Suspense } from 'react';
import { TasksInfo } from '@/features/tasks/components/tasks-info';
import { getTasks } from '@/features/tasks/queries';

type Props = {
  project: Project;
  userId: string;
};

export const ProjectDisplay = async ({ project, userId }: Props) => {
  const data = await getTasks(project.workspaceId, project.$id);
  const link = `/workspace/${project.workspaceId}/project/settings/${project.$id}`;

  return (
    <div>
      <FlexBox alignItems={'center'} justifyContent={'space-between'}>
        <Stack>
          <ProjectInnerItem
            name={project.name}
            image={project.imageUrl}
            size="sm"
            className="text-black"
          />
          <CustomText
            color={colors.grey}
            fontSize={'sm'}
            fontWeight={'bold'}
            ml={2}
          >
            Manage your projects
          </CustomText>
        </Stack>
        <Suspense fallback={null}>
          <EditActionMenu link={link} />
        </Suspense>
      </FlexBox>
      <TasksInfo tasks={data.documents} userId={userId} />
      <TaskViewSwitcher />
    </div>
  );
};
