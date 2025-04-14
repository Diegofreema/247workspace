'use client';

import { CreateButton } from '@/components/buttons/create-button';
import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { ReusableSkeleton } from '@/components/skeletons/link-skeleton';
import { Tooltip } from '@/components/ui/tooltip';
import { colors } from '@/constants';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useCreateProjectModalController } from '@/lib/nuqs/use-create-project';
import { Box, Stack } from '@chakra-ui/react';
import { IconPlus } from '@tabler/icons-react';
import { useTransitionRouter } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { useGetProjects } from '../api/use-get-projects';
import { ProjectItem } from './project-item';

export const Projects = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  const { open } = useCreateProjectModalController();
  const { data, isPending, isError } = useGetProjects({ workspaceId });

  const router = useTransitionRouter();

  if (isError) {
    return (
      <CustomText color={'#ccc'} textAlign={'center'} fontWeight={'bold'}>
        Failed to get projects
      </CustomText>
    );
  }
  if (isPending) {
    return <ReusableSkeleton />;
  }

  const projects = data.data.documents;

  const isEmpty = data?.data.total === 0;
  return (
    <Box>
      <FlexBox justifyContent={'space-between'} alignItems={'center'} px={4}>
        <CustomText
          color={colors.grey}
          fontWeight={'bold'}
          fontSize={{ base: 'sm', md: 'md' }}
        >
          Projects
        </CustomText>
        <Tooltip content="Create a project" openDelay={100} closeDelay={100}>
          <CreateButton
            width={'fit'}
            icon={<IconPlus size={25} color={colors.iconGrey} />}
            bg="transparent"
            onClick={open}
          />
        </Tooltip>
      </FlexBox>
      <Stack mt={2}>
        {projects.map((project) => {
          const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
          const isActive = pathname === href;

          return (
            <ProjectItem
              href={href}
              name={project.name}
              image={project.imageUrl}
              key={project.$id}
              size="xs"
              isActive={isActive}
            />
          );
        })}
        {isEmpty && (
          <CustomText color={colors.black} textAlign={'center'}>
            No projects found
          </CustomText>
        )}
      </Stack>
    </Box>
  );
};
