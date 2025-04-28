import { colors } from '@/constants';
import { useCreateTask } from '@/features/tasks/api/use-create-task';
import { createTaskSchema } from '@/features/tasks/schema';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import {
  useCreateTaskModalController,
  useSetProjectId,
  useSetTask,
} from '@/lib/nuqs/use-create-task';
import { PriorityEnum, StatusEnum, TicketStatus } from '@/types';
import { Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../custom/custom-button';
import { FlexBox } from '../custom/flex-box';
import { FormInput, FormInputDate } from './form-input';
import { useRaiseTicketModalController } from '@/lib/nuqs/use-raise-ticket';
import { createTicketSchema } from '@/features/tickets/schema';
import { useRaiseTicket } from '@/features/tickets/api/use-create-ticket';
import { statusData } from '@/features/tickets/components/ticket-filter';

type Props = {
  profileId: string;
  memberOptions: {
    label: string;
    value: string;
  }[];
};

export const CreateTicketForm = ({ memberOptions, profileId }: Props) => {
  const { mutateAsync } = useRaiseTicket();
  const workspaceId = useWorkspaceId();
  const { close } = useRaiseTicketModalController();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm<z.infer<typeof createTicketSchema>>({
    defaultValues: {
      workspaceId,
      status: TicketStatus.TODO,
      raisedBy: profileId,
    },
    resolver: zodResolver(createTicketSchema),
  });

  const onSubmit = async (data: z.infer<typeof createTicketSchema>) => {
    await mutateAsync(
      { json: { ...data, workspaceId } },
      {
        onSuccess: () => {
          reset();
        },
      }
    );

    await close();
  };

  return (
    <Stack gap={4}>
      <FormInput
        register={register}
        name="subject"
        label="Title"
        errors={errors}
        placeholder="eg Can't login"
        required
        disabled={isSubmitting}
      />

      <FormInput
        register={register}
        name="assigneeId"
        label="Assignee"
        errors={errors}
        placeholder="Choose Assignee"
        required
        disabled={isSubmitting}
        variant={'select'}
        data={memberOptions}
      />

      <FormInput
        register={register}
        name="status"
        label="Choose status"
        errors={errors}
        placeholder="Select status"
        required
        disabled={isSubmitting}
        variant={'select'}
        data={statusData}
      />

      <FormInput
        register={register}
        name="priority"
        label="Priority"
        errors={errors}
        placeholder="Select Priority"
        required
        disabled={isSubmitting}
        variant={'select'}
        data={priorityData}
      />
      <FormInput
        register={register}
        name="description"
        label="Task Description"
        errors={errors}
        placeholder="About this task..."
        disabled={isSubmitting}
        variant="textarea"
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
          Raise
        </Button>
      </FlexBox>
    </Stack>
  );
};

const priorityData = [
  { label: 'Urgent', value: PriorityEnum.URGENT },
  { label: 'Important', value: PriorityEnum.IMPORTANT },
  { label: 'Moderate', value: PriorityEnum.MODERATE },
  { label: 'Low', value: PriorityEnum.LOW },
  { label: 'Minimal', value: PriorityEnum.MINIMAL },
];
