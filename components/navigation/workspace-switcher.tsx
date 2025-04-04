'use client';
import { colors } from '@/constants';
import { Box, For, Stack } from '@chakra-ui/react';
import { IconPlus } from '@tabler/icons-react';
import { FlexBox } from '../custom/flex-box';
import { CustomText } from '../custom/title';

import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { ReusableSkeleton } from '../skeletons/link-skeleton';
import { WorkspaceItem } from './workpsace-item';
import { createWorkspaceModal$ } from '@/lib/legend/create-workspace-store';
import { Tooltip } from '../ui/tooltip';
import { CreateButton } from '../buttons/create-button';

export const WorkspaceSwitcher = () => {
  const { data, isPending, isError } = useGetWorkspaces();

  return (
    <Box mb={10} borderBottom={'1px solid #ccc'} pb={10}>
      <FlexBox justifyContent={'space-between'} alignItems={'center'} px={4}>
        <CustomText
          color={colors.grey}
          fontWeight={'bold'}
          fontSize={{ base: 'xl', md: '2xl' }}
        >
          Workspaces
        </CustomText>
        <Tooltip content="Create a workspace" openDelay={100} closeDelay={100}>
          <CreateButton
            width={'fit'}
            icon={<IconPlus size={25} color={colors.iconGrey} />}
            bg="transparent"
            onClick={() => createWorkspaceModal$.setOpen(true)}
          />
        </Tooltip>
      </FlexBox>
      <Stack mt={5}>
        {isError && (
          <CustomText color={'#ccc'} textAlign={'center'} fontWeight={'bold'}>
            No projects yet
          </CustomText>
        )}

        {isPending && (
          <Stack gap={5}>
            {[...Array(3)].map((_, i) => (
              <ReusableSkeleton key={i} />
            ))}
          </Stack>
        )}

        {!isError && !isPending && (
          <Stack gap={5} ml={10}>
            <For
              each={data?.documents.slice(0, 3)}
              fallback={
                <CustomText
                  color={'#ccc'}
                  textAlign={'center'}
                  fontWeight={'bold'}
                >
                  No projects yet
                </CustomText>
              }
            >
              {(item) => (
                <WorkspaceItem
                  key={item.$id}
                  name={item.name}
                  image={item.imageUrl}
                  id={item.$id}
                />
              )}
            </For>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
