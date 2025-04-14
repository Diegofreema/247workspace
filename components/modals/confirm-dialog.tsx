'use client';

import { colors } from '@/constants';

import { CloseButton, Dialog, IconButton, Portal } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { Button } from '../custom/custom-button';
import { FlexBox } from '../custom/flex-box';

type Props = {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  title: string;
  subtitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonText: string;
  isSubmitting?: boolean;
  btnColor?: string;
};

export const ConfirmDialog = ({
  confirmButtonText,
  isOpen,
  onCancel,
  onConfirm,
  setIsOpen,
  subtitle,
  title,
  isSubmitting,
  btnColor = colors.purple,
}: Props) => {
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
                  {title}
                </Dialog.Title>

                <IconButton onClick={onCancel} borderRadius={72}>
                  <CloseButton bg={colors.white} color={colors.black} />
                </IconButton>
              </FlexBox>
            </Dialog.Header>
            <Dialog.Body>
              <Dialog.Description>{subtitle}</Dialog.Description>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  width={'fit-content'}
                  disabled={isSubmitting}
                  color={colors.black}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                bg={btnColor}
                onClick={onConfirm}
                disabled={isSubmitting}
                loading={isSubmitting}
                width={'fit-content'}
              >
                {confirmButtonText}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
