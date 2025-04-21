'use client';

import { colors } from '@/constants';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { EditTaskWrapper } from '@/features/tasks/components/edit-task-form';
import { useEditTaskModalController } from '@/lib/nuqs/use-editi-task-modal-contoller';

export const EditTaskModal = () => {
  const { taskId, close } = useEditTaskModalController();

  return (
    <Dialog open={!!taskId} onOpenChange={close}>
      <DialogContent className={'bg-white'}>
        <DialogHeader>
          <DialogTitle
            color={colors.black}
            className={'text-black text-[25px]'}
          >
            Edit task
          </DialogTitle>

          {taskId && <EditTaskWrapper taskId={taskId} />}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
