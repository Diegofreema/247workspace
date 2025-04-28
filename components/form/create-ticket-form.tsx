import { colors } from '@/constants';
import { useRaiseTicket } from '@/features/tickets/api/use-create-ticket';
import { createTicketSchema } from '@/features/tickets/schema';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useRaiseTicketModalController } from '@/lib/nuqs/use-raise-ticket';
import { PriorityEnum, TicketStatus } from '@/types';
import { Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../custom/custom-button';
import { FlexBox } from '../custom/flex-box';
import { FormInput } from './form-input';

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
      raisedId: profileId,
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
        required
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

export const statusData = [
  { label: 'Unassigned', value: TicketStatus.UNASSIGNED },
  { label: 'Todo', value: TicketStatus.TODO },
  { label: 'In progress', value: TicketStatus.IN_PROGRESS },
  { label: 'In review', value: TicketStatus.IN_REVIEW },
  { label: 'Resolved', value: TicketStatus.RESOLVED },
];
