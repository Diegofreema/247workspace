import { colors } from '@/constants';
import { useCreateTask } from '@/features/tasks/api/use-create-task';
import { createTaskSchema } from '@/features/tasks/schema';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useCreateTaskModalController } from '@/lib/nuqs/use-create-task';
import { Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../custom/custom-button';
import { FlexBox } from '../custom/flex-box';
import { FormInput, FormInputDate } from './form-input';

type Props = {
  projectOptions: {
    id: string;
    name: string;
    imageUrl?: string;
  }[];
  memberOptions: {
    id: string;
    name: string;
  }[];
};

export const CreateTaskForm = ({ memberOptions, projectOptions }: Props) => {
  const { mutateAsync } = useCreateTask();
  const workspaceId = useWorkspaceId();
  const { close } = useCreateTaskModalController();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    control,
  } = useForm<z.infer<typeof createTaskSchema>>({
    defaultValues: {
      workspaceId,
    },
    resolver: zodResolver(createTaskSchema),
  });

  const onSubmit = async (data: z.infer<typeof createTaskSchema>) => {
    await mutateAsync({ json: { ...data, workspaceId } });
    reset();
    close();
  };
  return (
    <Stack gap={4}>
      <FormInput
        register={register}
        name="name"
        label="Task name"
        errors={errors}
        placeholder="My task"
        required
        disabled={isSubmitting}
      />
      <FormInputDate
        control={control}
        name="dueDate"
        label="Due date"
        errors={errors}
        required
        disabled={isSubmitting}
      />
      <FlexBox>
        <Button
          variant="outline"
          width={'fit-content'}
          disabled={isSubmitting}
          color={colors.black}
          onClick={close}
        >
          Cancel
        </Button>

        <Button
          bg={colors.purple}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          loading={isSubmitting}
          width={'fit-content'}
        >
          Create
        </Button>
      </FlexBox>
    </Stack>
  );
};
