'use client';

import { colors } from '@/constants';

import { CloseButton, Dialog, IconButton, Portal } from '@chakra-ui/react';

import { FeedbackWrapper } from '@/features/feedbacks/components/feedback-form-wrapper';
import { useCreateFeedbackController } from '@/lib/nuqs/use-create-feedback-controller';
import { FlexBox } from '../custom/flex-box';

export const CreateFeedbackModal = () => {
  const { taskId, close } = useCreateFeedbackController();

  return (
    <Dialog.Root
      placement="center"
      motionPreset={'slide-in-bottom'}
      open={!!taskId}
      onOpenChange={close}
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
                  Add a feedback
                </Dialog.Title>
                <IconButton onClick={close} borderRadius={72}>
                  <CloseButton bg={colors.white} color={colors.black} />
                </IconButton>
              </FlexBox>
            </Dialog.Header>
            <FeedbackWrapper />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
