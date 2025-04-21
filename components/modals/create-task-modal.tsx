'use client';

import { colors } from '@/constants';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { CreateTaskFormWrapper } from '@/features/tasks/components/create-task-form-wrapper';
import { useCreateTaskModalController } from '@/lib/nuqs/use-create-task';

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen } = useCreateTaskModalController();

  return (
    <Dialog open={isOpen} onOpenChange={(e) => setIsOpen(e)}>
      <DialogContent className={'bg-white'}>
        <DialogHeader>
          <DialogTitle
            color={colors.black}
            className={'text-black text-[25px]'}
          >
            Create a new task
          </DialogTitle>
          <DialogDescription>
            Assign a task to a team member and track accountability
          </DialogDescription>
          <CreateTaskFormWrapper />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
