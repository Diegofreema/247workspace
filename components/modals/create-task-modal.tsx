'use client';

import { colors } from '@/constants';

import { CloseButton, Dialog, IconButton, Portal } from '@chakra-ui/react';

import { CreateTaskWrapper } from '@/features/tasks/components/create-task-wrapper';
import { useCreateTaskModalController } from '@/lib/nuqs/use-create-task';
import { FlexBox } from '../custom/flex-box';
import { useEffect, useState } from 'react';

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen, close } = useCreateTaskModalController();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <Dialog.Root
      placement="center"
      motionPreset={'slide-in-bottom'}
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg={colors.white}>
            <Dialog.Header>
              <FlexBox
                justifyContent={'space-between'}
                width="100%"
                alignItems={'center'}
              >
                <Dialog.Title color={colors.black} fontSize={30}>
                  Create a new task
                </Dialog.Title>
                <IconButton onClick={close} borderRadius={72}>
                  <CloseButton bg={colors.white} color={colors.black} />
                </IconButton>
              </FlexBox>
            </Dialog.Header>
            <Dialog.Body>
              <CreateTaskWrapper />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
