'use client';
import { Button } from '@/components/custom/custom-button';
import { FlexBox } from '@/components/custom/flex-box';
import { CustomText, Title } from '@/components/custom/title';
import { colors } from '@/constants';
import { useCreateTaskModalController } from '@/lib/nuqs/use-create-task';
import { Stack, Tabs } from '@chakra-ui/react';
import { useState } from 'react';

type Props = {};
const tabs = ['table', 'kanban', 'calender'];
export const TaskViewSwitcher = ({}: Props) => {
  const [value, setValue] = useState<string | null>('table');
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
        <FlexBox
          justifyContent={'space-between'}
          alignItems={'center'}
          flexDir={{ base: 'column', md: 'row' }}
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
          <Button
            color={colors.white}
            bg={colors.purple}
            variant={'solid'}
            px={2}
            width="fit"
            onClick={open}
          >
            New task
          </Button>
        </FlexBox>
        <Tabs.Content value="table">Manage your team members</Tabs.Content>
        <Tabs.Content value="kanban">Manage your projects</Tabs.Content>
        <Tabs.Content value="calender">
          Manage your tasks for freelancers
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
};
