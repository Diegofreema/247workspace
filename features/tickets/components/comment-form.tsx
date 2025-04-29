import { FlexBox } from '@/components/custom/flex-box';
import { FormInput } from '@/components/form/form-input';
import { colors } from '@/constants';
import { useCreateComment } from '@/features/comments/api/use-create-comment';
import { commentSchema } from '@/features/comments/schema';
import { IconButton } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconSend } from '@tabler/icons-react';
import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  profileId: string;
  ticketId: string;
};

export const CommentForm = ({ profileId, ticketId }: Props) => {
  const { mutateAsync } = useCreateComment();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof commentSchema>>({
    defaultValues: {
      comment: '',
      authorId: profileId,
    },
    resolver: zodResolver(commentSchema),
  });
  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    await mutateAsync({
      json: data,
      param: {
        ticketId,
      },
    });
  };
  return (
    <FlexBox
      flexDir={'column'}
      width="100%"
      border={'1px solid #ccc'}
      gap={2}
      p={3}
      borderRadius={5}
    >
      <FormInput
        register={register}
        errors={errors}
        label="Comment"
        placeholder="Add a comment.."
        name="comment"
        variant="textarea"
      />
      <IconButton
        bg={colors.purple}
        className="hover:opacity-50 transition self-end"
        disabled={isSubmitting}
        onClick={() => handleSubmit(onSubmit)}
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
  );
};
