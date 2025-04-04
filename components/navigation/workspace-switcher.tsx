'use client';
import { colors } from '@/constants';
import {
  Avatar,
  Box,
  createListCollection,
  HStack,
  Image,
  Portal,
  Select,
  Stack,
  useSelectContext,
} from '@chakra-ui/react';
import { IconPlus } from '@tabler/icons-react';
import { FlexBox } from '../custom/flex-box';
import { CustomText } from '../custom/title';

import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { ReusableSkeleton } from '../skeletons/link-skeleton';
import { WorkspaceItem } from './workpsace-item';

import { createWorkspaceModal$ } from '@/lib/legend/create-workspace-store';
import { useMemo } from 'react';
import { CreateButton } from '../buttons/create-button';
import { Tooltip } from '../ui/tooltip';
import { useRouter } from 'next/navigation';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';

export const WorkspaceSwitcher = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { data, isPending, isError } = useGetWorkspaces();
  const defaultValue = useMemo(() => {
    return data?.documents[0]?.$id;
  }, [data?.documents]);
  const items = useMemo(() => {
    return (
      data?.documents.map((workspace) => ({
        label: workspace.name,
        value: workspace.$id,
        imageUrl: workspace.imageUrl,
      })) ?? []
    );
  }, [data?.documents]);
  const workspaces = createListCollection({
    items,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  const onSelect = (value: string[]) => {
    console.log(value[0]);

    router.push(`/workspaces/${value[0]}/home`);
  };
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

        {isPending && <ReusableSkeleton />}

        {!isError && !isPending && (
          <Select.Root
            collection={workspaces}
            size="lg"
            defaultValue={[defaultValue]}
            positioning={{ sameWidth: true }}
            value={[workspaceId as string]}
            onValueChange={(e) => onSelect(e.value)}
          >
            <Select.HiddenSelect />

            <Select.Control fontWeight={'bold'}>
              <Select.Trigger
                border="1px solid #ccc"
                p={1}
                color={colors.iconGrey}
              >
                <SelectValue />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content bg={'white'}>
                  {workspaces.items.map((workspace) => (
                    <Select.Item
                      item={workspace}
                      key={workspace.value}
                      className="group hover:bg-purple transition duration-300 ease-in-out"
                    >
                      <WorkspaceItem
                        name={workspace.label}
                        id={workspace.value}
                        image={workspace.imageUrl}
                      />
                      <Select.ItemIndicator
                        className={
                          'text-purple group-hover:text-white transition duration-300 ease-in-out'
                        }
                      />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      </Stack>
    </Box>
  );
};

const SelectValue = () => {
  const select = useSelectContext();
  const items = select.selectedItems as Array<{
    label: string;
    imageUrl: string;
  }>;
  const item = items[0];
  return (
    <Select.ValueText placeholder="No workspace selected" bg="white">
      <HStack>
        <Avatar.Root colorPalette={'purple'}>
          <Avatar.Image asChild width={38} height={38}>
            <Image
              src={item?.imageUrl}
              alt={item?.label}
              borderRadius={200}
              width={38}
              height={38}
              objectFit={'fill'}
            />
          </Avatar.Image>
          <Avatar.Fallback name={item?.label[0]?.toUpperCase()} />
        </Avatar.Root>
        {item?.label}
      </HStack>
    </Select.ValueText>
  );
};
