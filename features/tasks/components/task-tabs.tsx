import { Button } from '@/components/custom/custom-button';
import { FlexBox } from '@/components/custom/flex-box';
import { CustomText, Title } from '@/components/custom/title';
import { DataFilter } from '@/components/ui/data-filter';
import { colors } from '@/constants';
import { useCreateTaskModalController } from '@/lib/nuqs/use-create-task';
import { useSwitchTabs } from '@/lib/nuqs/use-switch-tabs';
import { TaskWithProjectAndAssignee } from '@/types';
import { Stack, Tabs } from '@chakra-ui/react';
import { ProjectCalendar } from './project-calendar';
import { ProjectKanban } from './project-kanban';
import { ProjectTable } from './project-table';

type Props = {
  tasks: TaskWithProjectAndAssignee[];
};
const tabs = ['table', 'kanban', 'calender'];
export const TaskTabs = ({ tasks }: Props) => {
  const { tab: value, setTab: setValue } = useSwitchTabs();
  const { open } = useCreateTaskModalController();
  return (
    <Stack bg={colors.white} borderRadius={10} p={4} mt={5}>
      <Stack mb={3}>
        <Title
          color={colors.black}
          lineHeight={1.2}
          fontSize={{ base: 'md', md: 'lg' }}
        >
          Tasks
        </Title>
        <CustomText color={colors.grey}>View all tasks here</CustomText>
      </Stack>
      <Tabs.Root
        value={value}
        onValueChange={(e) => setValue(e.value)}
        variant={'subtle'}
      >
        <Tabs.List gap={2}>
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab}
              value={tab}
              bg={tab === value ? colors.purple : colors.lightGrey}
              textTransform={'capitalize'}
              color={tab === value ? colors.white : colors.grey}
              px={3}
            >
              {tab}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <FlexBox
          justifyContent={{ base: 'start', md: 'space-between' }}
          gap={2}
          flexDir={{ base: 'column', md: 'row' }}
          mt={3}
        >
          <DataFilter />
          <Button
            color={colors.white}
            bg={colors.purple}
            variant={'solid'}
            px={2}
            width={{ base: '100%', md: 'fit' }}
            onClick={open}
          >
            New task
          </Button>
        </FlexBox>
        <Tabs.Content value="table" width={'100%'}>
          <ProjectTable tasks={tasks} />
        </Tabs.Content>
        <Tabs.Content value="kanban">
          <ProjectKanban tasks={tasks} />
        </Tabs.Content>
        <Tabs.Content value="calender">
          <ProjectCalendar tasks={tasks} />
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
};
