'use client';

import { colors } from '@/constants';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { EditTaskWrapper } from '@/features/tasks/components/edit-task-form';
import { useEditProjectModalController } from '@/lib/nuqs/use-edit-project-modal';
import { useEffect, useState } from 'react';
import { EditProjectWrapper } from '@/features/projects/components/edit-project-wrapper';

export const EditProjectModal = () => {
  const { projectId, close } = useEditProjectModalController();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
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
