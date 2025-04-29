"use client";

import { colors } from "@/constants";
import { Card, For, Stack } from "@chakra-ui/react";
import { CommentForm } from "./comment-form";
import { useGetComments } from "@/features/comments/api/use-get-comments";
import { ErrorComponent } from "@/components/ui/error-component";
import { SmallerLoader } from "@/components/ui/small-loader";
import { Comment } from "./comment";
import { CustomText } from "@/components/custom/title";
import { ConfirmDialog } from "@/components/modals/confirm-dialog";
import { useDeleteComment } from "@/features/comments/api/use-delete-comment";
import { useDeleteCommentModalController } from "@/lib/nuqs/useDeleteModalController";

type Props = {
  ticketId: string;
  profileId: string;
};

export const Comments = ({ profileId, ticketId }: Props) => {
  const { data, isPending, isError, refetch, error } = useGetComments({
    ticketId,
  });
  const { commentId, close } = useDeleteCommentModalController();
  const { mutateAsync, isPending: isPendingDelete } = useDeleteComment();
  if (isError) {
    return (
      <ErrorComponent
        message={error.message}
        reset={refetch}
        className="mt-5"
      />
    );
  }

  if (isPending) {
    return <SmallerLoader />;
  }
  const onDelete = async () => {
    if (!commentId) return;
    await mutateAsync(
      {
        param: { commentId },
        json: { authorId: profileId },
      },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

  return (
    <>
      <ConfirmDialog
        isOpen={!!commentId}
        setIsOpen={close}
        title={"Delete comment"}
        subtitle={"Are you sure you want to delete this comment?"}
        onConfirm={onDelete}
        onCancel={close}
        confirmButtonText={"Delete"}
        btnColor={colors.red}
        isSubmitting={isPendingDelete}
      />

      <Card.Root width="100%" bg={colors.white}>
        <Card.Body gap="2">
          <Stack gap={5}>
            <For
              each={data.documents}
              fallback={
                <CustomText
                  color={colors.black}
                  fontWeight={"bold"}
                  textAlign={"center"}
                  width={"100%"}
                >
                  No comments yet
                </CustomText>
              }
            >
              {(item, index) => (
                <Comment key={index} item={item} profileId={profileId} />
              )}
            </For>
          </Stack>
        </Card.Body>
        <Card.Footer>
          <CommentForm profileId={profileId} ticketId={ticketId} />
        </Card.Footer>
      </Card.Root>
    </>
  );
};
