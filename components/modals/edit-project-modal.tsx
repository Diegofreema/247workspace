'use client';

import { colors } from '@/constants';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { EditProjectWrapper } from '@/features/projects/components/edit-project-wrapper';
import { useEditProjectModalController } from '@/lib/nuqs/use-edit-project-modal';

export const EditProjectModal = () => {
  const { projectId, close } = useEditProjectModalController();

  return (
    <Dialog open={!!projectId} onOpenChange={close}>
      <DialogContent className={'bg-white'}>
        <DialogHeader>
          <DialogTitle
            color={colors.black}
            className={'text-black text-[25px]'}
          >
            Edit project
          </DialogTitle>

          {projectId && <EditProjectWrapper />}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
