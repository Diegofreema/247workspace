'use client';

import { colors } from '@/constants';

import { CloseButton, Dialog, IconButton, Portal } from '@chakra-ui/react';

import { useViewDocumentModalController } from '@/lib/nuqs/use-view-document-controller';
import { Download } from 'lucide-react';
import { Button } from '../custom/custom-button';
import { FlexBox } from '../custom/flex-box';
import { ViewDocumentWrapper } from '@/features/documents/components/view-document-wrapper';

export const ViewDocumentModal = () => {
  const { documentId, close } = useViewDocumentModalController();

  const onCancel = () => {
    close();
  };

  return (
    <Dialog.Root
      placement="center"
      motionPreset={'slide-in-bottom'}
      open={!!documentId}
      onOpenChange={close}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg={colors.white}>
            <Dialog.Body>
              {documentId && (
                <ViewDocumentWrapper documentId={documentId} close={close} />
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  width={'fit-content'}
                  disabled={false}
                  color={colors.black}
                  onClick={onCancel}
                >
                  Close
                </Button>
              </Dialog.ActionTrigger>
              <Button
                bg={colors.purple}
                onClick={() => {}}
                disabled={false}
                loading={false}
                width={'fit-content'}
              >
                <Download className="text-white" size={25} /> Download
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
