'use client';

import { colors } from '@/constants';
import { Dialog, Portal, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner';

export const LoadingModal = ({ isPending }: { isPending: boolean }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <Dialog.Root
      placement="center"
      motionPreset={'slide-in-bottom'}
      open={isPending}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner bg="transparent">
          <Dialog.Content
            bg={'white'}
            width={100}
            borderRadius={100}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Circles
              height="100"
              width="100"
              color={colors.purple}
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
