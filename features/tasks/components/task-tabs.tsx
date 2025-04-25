import { Button } from '@/components/custom/custom-button';
import { FlexBox } from '@/components/custom/flex-box';
import { DataFilter } from '@/components/ui/data-filter';
import { colors } from '@/constants';
import { useCreateTaskModalController } from '@/lib/nuqs/use-create-task';
import { useSwitchTabs } from '@/lib/nuqs/use-switch-tabs';
import { MemberRole, StatusEnum, TaskWithProjectAndAssignee } from '@/types';
import { Stack, Tabs } from '@chakra-ui/react';
// import { ProjectCalendar } from './project-calendar';
import { LoadingModal } from '@/components/modals/loading-modal';
import { Heading } from '@/components/ui/heading';
import { SmallerLoader } from '@/components/ui/small-loader';
import { useCallback } from 'react';
import { useUpdateBulkTask } from '../api/use-bulk-update';
import { columns } from './column';
import { ProjectKanban } from './project-kanban';
import { ProjectTable } from './project-table';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';

type Props = {
  tasks: TaskWithProjectAndAssignee[];
  isPending: boolean;
  hideProjectFilter?: boolean;
  memberRole: MemberRole;
};
const tabs = ['table', 'kanban'];
export const TaskTabs = ({
  tasks,
  isPending,
  hideProjectFilter,
  memberRole,
}: Props) => {
  const { tab: value, setTab: setValue } = useSwitchTabs();
  const workspaceId = useWorkspaceId();
  const { open } = useCreateTaskModalController();

  const { mutateAsync, isPending: isPendingTasks } = useUpdateBulkTask();
  const onKanbanChange = useCallback(
    async (tasks: { $id: string; status: StatusEnum; position: number }[]) => {
      mutateAsync({ json: { tasks } });
    },
    [mutateAsync]
  );

  return (
    <>
      <LoadingModal isPending={isPendingTasks} />
      <Stack bg={colors.white} borderRadius={10} p={4} mt={5}>
        <Heading />
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
            <DataFilter hideProjectFilter={hideProjectFilter} />
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
          {isPending ? (
            <SmallerLoader />
          ) : (
            <>
              <Tabs.Content value="table" width={'100%'} overflowX={'scroll'}>
                <ProjectTable data={tasks} columns={columns} />
              </Tabs.Content>
              <Tabs.Content value="kanban" overflowX={'scroll'}>
                <ProjectKanban
                  onChange={onKanbanChange}
                  tasks={tasks}
                  memberRole={memberRole}
                />
              </Tabs.Content>
              {/* <Tabs.Content value="calender" overflowX={'scroll'}>
                <ProjectCalendar tasks={tasks} />
              </Tabs.Content> */}
            </>
          )}
        </Tabs.Root>
      </Stack>
    </>
  );
};
