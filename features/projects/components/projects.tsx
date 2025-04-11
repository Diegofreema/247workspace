'use client';

import { CreateButton } from '@/components/buttons/create-button';
import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { Tooltip } from '@/components/ui/tooltip';
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
import { useGetProjects } from '../api/use-get-projects';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { ReusableSkeleton } from '@/components/skeletons/link-skeleton';
import { useMemo } from 'react';
import { useProjectId } from '@/hooks/useProjectId';
import { useCreateProjectModalController } from '@/lib/nuqs/use-create-project';

export const Projects = () => {
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();
  const { open } = useCreateProjectModalController();
  const { data, isPending, isError } = useGetProjects({ workspaceId });

  const defaultValue = useMemo(() => {
    if (isPending) return '';
    if (isError) return '';
    return data?.data.documents[0]?.$id;
  }, [data?.data.documents, isError, isPending]);
  const items = useMemo(() => {
    return (
      data?.data.documents.map((workspace) => ({
        label: workspace.name,
        value: workspace.$id,
        imageUrl: workspace.imageUrl,
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

    //    router.push(`/projects/${value[0]}/home`);
  };

  return (
    <Box mb={5} borderBottom={'1px solid #ccc'} pb={10}>
      <FlexBox justifyContent={'space-between'} alignItems={'center'} px={4}>
        <CustomText
          color={colors.grey}
          fontWeight={'bold'}
          fontSize={{ base: 'xl', md: '2xl' }}
        >
          Projects
        </CustomText>
        <Tooltip content="Create a workspace" openDelay={100} closeDelay={100}>
          <CreateButton
            width={'fit'}
            icon={<IconPlus size={25} color={colors.iconGrey} />}
            bg="transparent"
            onClick={open}
          />
        </Tooltip>
      </FlexBox>
      <Stack mt={5}>
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
                {projects.items.map((project) => (
                  <Select.Item
                    item={project}
                    key={project.value}
                    className="group hover:bg-purple transition duration-300 ease-in-out"
                  >
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
