'use client';

import { CreateButton } from '@/components/buttons/create-button';
import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { AvatarItem } from '@/components/navigation/workpsace-item';
import { ReusableSkeleton } from '@/components/skeletons/link-skeleton';
import { Tooltip } from '@/components/ui/tooltip';
import { colors } from '@/constants';
import { useProjectId } from '@/hooks/useProjectId';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useCreateProjectModalController } from '@/lib/nuqs/use-create-project';
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
import { useTransitionRouter } from 'next-view-transitions';
import { useMemo } from 'react';
import { useGetProjects } from '../api/use-get-projects';

export const Projects = () => {
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();
  const { open } = useCreateProjectModalController();
  const { data, isPending, isError } = useGetProjects({ workspaceId });

  const router = useTransitionRouter();
  const defaultValue = useMemo(() => {
    if (isPending) return '';
    if (isError) return '';
    return data?.data.documents[0]?.$id;
  }, [data?.data.documents]);
  const items = useMemo(() => {
    return (
      data?.data.documents.map((project) => ({
        label: project.name,
        value: project.$id,
        imageUrl: project.imageUrl,
      })) ?? []
    );
  }, [data?.data?.documents]);
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

  const projects = createListCollection({
    items,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  const onSelect = (value: string[]) => {
    console.log(value[0]);
    const href = `/workspaces/${workspaceId}/projects/${value[0]}`;
    router.push(href);
  };
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
        <Select.Root
          collection={projects}
          size="lg"
          defaultValue={[defaultValue]}
          positioning={{ sameWidth: true }}
          value={[projectId as string]}
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
                {projects.items.map((project) => {
                  return (
                    <Select.Item
                      item={project}
                      key={project.value}
                      className="group hover:bg-purple transition duration-300 ease-in-out"
                    >
                      <AvatarItem
                        name={project.label}
                        image={project.imageUrl}
                      />
                      <Select.ItemIndicator
                        className={
                          'text-purple group-hover:text-white transition duration-300 ease-in-out'
                        }
                      />
                    </Select.Item>
                  );
                })}
                {isEmpty && (
                  <CustomText color={colors.black} textAlign={'center'}>
                    No projects found
                  </CustomText>
                )}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
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
  if (!item) {
    return <CustomText color={colors.grey}>No projects selected</CustomText>;
  }

  return (
    <Select.ValueText placeholder="No projects selected" bg="white">
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
