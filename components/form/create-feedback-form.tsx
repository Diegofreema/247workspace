import { colors } from '@/constants';
import { createFeedbackSchema } from '@/features/feedbacks/schema';
import { useCreateFeedbackController } from '@/lib/nuqs/use-create-feedback-controller';
import { Button, Dialog, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormInput } from './form-input';
import { useCreateFeedback } from '@/features/feedbacks/api/use-create-feedback';

type Props = {
  profileId: string;
};

export const CreateFeedbackForm = ({ profileId }: Props) => {
  const { taskId, close } = useCreateFeedbackController();
  const { mutateAsync } = useCreateFeedback();
  console.log({ taskId, profileId });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm<z.infer<typeof createFeedbackSchema>>({
    defaultValues: {
      feedback: '',
      profileId: profileId,
      taskId: taskId as string,
    },
    resolver: zodResolver(createFeedbackSchema),
  });

  const onSubmit = async (data: z.infer<typeof createFeedbackSchema>) => {
    console.log(data);
    await mutateAsync(
      { json: data },
      {
        onSuccess: () => {
          reset();
          close();
        },
      }
    );
  };
  const onCancel = () => {
    reset();
    close();
  };

  return (
    <div>
      <Dialog.Body>
        <Stack gap={5}>
          <FormInput
            register={register}
            name="feedback"
            label="Feedback"
            errors={errors}
            placeholder="Give your feedback for this task"
            required
            disabled={isSubmitting}
            variant="textarea"
          />
        </Stack>
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.ActionTrigger asChild>
          <Button
            variant="outline"
            width={'fit-content'}
            disabled={isSubmitting}
            color={colors.black}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Dialog.ActionTrigger>
        <Button
          bg={colors.purple}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          loading={isSubmitting}
          width={'fit-content'}
          px={3}
        >
          Send
        </Button>
      </Dialog.Footer>
    </div>
  );
};
