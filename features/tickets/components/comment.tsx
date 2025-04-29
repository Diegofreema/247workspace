import {CommentWithProfile} from "@/types";
import React, {useCallback} from "react";
import {Stack} from "@chakra-ui/react";
import {FlexBox} from "@/components/custom/flex-box";
import {ProfileAvatar} from "@/components/ui/profile-avatar";
import {CustomText} from "@/components/custom/title";
import {colors} from "@/constants";
import {format} from "date-fns";
import {CommentAction} from "@/features/comments/components/comment-action";
import {useEditTicketCommentController} from "@/lib/nuqs/use-edit-ticket-comment-controller";
import {editComment$} from "@/lib/legend/edit-comment";
import {useDeleteCommentModalController} from "@/lib/nuqs/useDeleteModalController";

type Props = {
  item: CommentWithProfile;
  profileId: string;
};

export const Comment = ({ item, profileId }: Props) => {
  const isMyComment = item.author?.$id === profileId;
  const { open } = useEditTicketCommentController();
  const { open: openDelete } = useDeleteCommentModalController();
  const onEdit = useCallback(() => {
    void open(item.$id);
    editComment$.setValues({ comment: item.comment, authorId: profileId });
  }, [item, open, profileId]);

  const onDelete = () => {
    void openDelete(item.$id);
  };
  return (
    <Stack>
      <FlexBox alignItems={"center"} justifyContent={"space-between"}>
        <FlexBox alignItems={"center"} gap={2}>
          <ProfileAvatar
            name={item.author.name}
            imageUrl={item.author.avatarUrl}
          />
          <CustomText fontWeight={"bold"} color={colors.black}>
            {item.author.name}
          </CustomText>
        </FlexBox>
        <CustomText color={colors.iconGrey} fontSize={"sm"}>
          {format(item.$createdAt, "PP h:mm a")}
        </CustomText>
      </FlexBox>
      <CustomText color={colors.grey} mt={4} fontSize={"sm"} pl={12}>
        {item.comment}
      </CustomText>
      {isMyComment && <CommentAction onDelete={onDelete} onEdit={onEdit} />}
    </Stack>
  );
};
