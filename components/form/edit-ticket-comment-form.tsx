import {FlexBox} from "@/components/custom/flex-box";
import {FormInput} from "@/components/form/form-input";
import {colors} from "@/constants";
import {commentSchema} from "@/features/comments/schema";
import {IconButton} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {IconSend} from "@tabler/icons-react";
import {LoaderCircle} from "lucide-react";
import React from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {CustomText} from "@/components/custom/title";
import {useUpdateComment} from "@/features/comments/api/use-update-comment";
import {useEditTicketCommentController} from "@/lib/nuqs/use-edit-ticket-comment-controller";
import {editComment$} from "@/lib/legend/edit-comment";

const MAX_LENGTH = 200;
export const EditTicketCommentForm = () => {
  const { mutateAsync } = useUpdateComment();
  const { commentId, close } = useEditTicketCommentController();
  const authorId = editComment$.authorId.get();
  const previousComment = editComment$.comment.get();
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof commentSchema>>({
    defaultValues: {
      comment: previousComment,
      authorId,
    },
    resolver: zodResolver(commentSchema),
  });
  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    if (!commentId) return;
    await mutateAsync(
      {
        json: data,
        param: {
          commentId,
        },
      },
      {
        onSuccess: () => {
          reset();
          editComment$.clear();
          close();
        },
      },
    );
  };

  const { comment } = watch();

  return (
    <FlexBox
      flexDir={"column"}
      width="100%"
      border={"1px solid #ccc"}
      gap={2}
      p={3}
      borderRadius={5}
      mt={10}
    >
      <FormInput
        register={register}
        errors={errors}
        borderStyle={"none"}
        placeholder="Add a comment.."
        name="comment"
        variant="textarea"
        disabled={isSubmitting}
      />
      <FlexBox justifyContent={"space-between"} alignItems={"center"} mt={3}>
        <CustomText color={colors.black} fontWeight={"bold"}>
          {comment.length}/{MAX_LENGTH}
        </CustomText>
        <IconButton
          bg={colors.purple}
          className="hover:opacity-50 transition self-end"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? (
            <LoaderCircle
              className="animate-spin"
              color={colors.white}
              size={30}
            />
          ) : (
            <IconSend color={colors.white} size={30} />
          )}
        </IconButton>
      </FlexBox>
    </FlexBox>
  );
};
