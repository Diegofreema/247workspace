'use client';

import { colors } from '@/constants';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Textarea } from '@chakra-ui/react';
import { Button } from '../ui/button';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onSubmit: () => void;
  isPending: boolean;
  setValue: (value: string) => void;
  value: string;
};

export const EditFeedbackModal = ({
  isOpen,
  isPending,
  onClose,
  onSubmit,
  setValue,
  value,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={'bg-white'}>
        <DialogHeader>
          <DialogTitle
            color={colors.black}
            className={'text-black text-[25px]'}
          >
            Edit feedback
          </DialogTitle>
        </DialogHeader>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write something..."
          color={colors.black}
          rows={5}
          p={4}
        />
        <DialogFooter>
          <Button onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isPending}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
