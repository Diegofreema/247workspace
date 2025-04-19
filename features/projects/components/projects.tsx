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
import { usePathname } from 'next/navigation';
import { useGetProjects } from '../api/use-get-projects';
import { ProjectItem } from './project-item';
import { Link } from 'next-view-transitions';

export const Projects = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  const { open } = useCreateProjectModalController();
  const { data, isPending, isError } = useGetProjects({ workspaceId });

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

  const projects = data.documents;

  const isEmpty = data.total === 0;

  const isActive = pathname === `/workspaces/${workspaceId}/projects`;
  return (
    <Box>
      <FlexBox
        justifyContent={'space-between'}
        alignItems={'center'}
        px={4}
        bg={isActive ? colors.purple : 'transparent'}
      >
        <Link href={`/workspaces/${workspaceId}/projects`}>
          <CustomText
            color={isActive ? colors.white : colors.grey}
            fontWeight={'bold'}
            fontSize={{ base: 'sm', md: 'md' }}
          >
            Projects
          </CustomText>
        </Link>
        <Tooltip content="Create a project" openDelay={100} closeDelay={100}>
          <CreateButton
            width={'fit'}
            icon={
              <IconPlus
                size={25}
                color={isActive ? colors.white : colors.iconGrey}
              />
            }
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
