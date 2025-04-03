'use client';
import { colors } from '@/constants';
import { Box, For, Stack } from '@chakra-ui/react';
import { IconPlus } from '@tabler/icons-react';
import { FlexBox } from '../custom/flex-box';
import { CustomText } from '../custom/title';
import { CreateProject } from '../buttons/create-project';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { ReusableSkeleton } from '../skeletons/link-skeleton';
import { ProjectItem } from './project-item';

export const ProjectSwitcher = () => {
  const { data, isPending, isError } = useGetProjects();
  console.log({ data });

  return (
    <Box mb={10} borderBottom={'1px solid #ccc'} pb={10}>
      <FlexBox justifyContent={'space-between'} alignItems={'center'} px={4}>
        <CustomText
          color={colors.grey}
          fontWeight={'bold'}
          fontSize={{ base: 'xl', md: '2xl' }}
        >
          Projects
        </CustomText>
        <CreateProject
          width={'fit'}
          icon={<IconPlus size={25} color={colors.iconGrey} />}
          bg="transparent"
        />
      </FlexBox>
      <Stack mt={5}>
        {isError ||
          (data?.total === 0 && (
            <CustomText color={'#ccc'} textAlign={'center'} fontWeight={'bold'}>
              No projects yet
            </CustomText>
          ))}

        {isPending && (
          <Stack gap={5}>
            {[...Array(3)].map((_, i) => (
              <ReusableSkeleton key={i} />
            ))}
          </Stack>
        )}

        {!isError && !isPending && (
          <Stack gap={5} ml={10}>
            <For each={data?.documents.slice(0, 3)}>
              {(item) => <ProjectItem key={item.$id} />}
            </For>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
