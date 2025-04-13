"use client";

import { colors } from "@/constants";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CreateTaskFormWrapper } from "@/features/tasks/components/create-task-form-wrapper";
import { useCreateTaskModalController } from "@/lib/nuqs/use-create-task";
import { useEffect, useState } from "react";

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen } = useCreateTaskModalController();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <Dialog open={isOpen} onOpenChange={(e) => setIsOpen(e)}>
      <DialogContent className={"bg-white"}>
        <DialogHeader>
          <DialogTitle
            color={colors.black}
            className={"text-black text-[25px]"}
          >
            Create a new task
          </DialogTitle>

          <CreateTaskFormWrapper />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
