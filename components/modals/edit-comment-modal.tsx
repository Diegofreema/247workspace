"use client";

import { colors } from "@/constants";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditTicketCommentController } from "@/lib/nuqs/use-edit-ticket-comment-controller";
import { EditTicketCommentForm } from "@/components/form/edit-ticket-comment-form";

export const EditCommentModal = () => {
  const { commentId, close } = useEditTicketCommentController();

  return (
    <Dialog open={!!commentId} onOpenChange={close}>
      <DialogContent className={"bg-white"}>
        <DialogHeader>
          <DialogTitle
            color={colors.black}
            className={"text-black text-[25px]"}
          >
            Edit comment
          </DialogTitle>

          <EditTicketCommentForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
