import { colors } from '@/constants';
import { useUpdateTicket } from '@/features/tickets/api/use-edit-ticket';
import { createTicketSchema } from '@/features/tickets/schema';
import { useRaiseTicketModalController } from '@/lib/nuqs/use-raise-ticket';
import { PriorityEnum, TicketStatus } from '@/types';
import { Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../custom/custom-button';
import { FlexBox } from '../custom/flex-box';
import { toaster } from '../ui/toaster';
import { FormInput } from './form-input';
import { useEditTicketModalController } from '@/lib/nuqs/use-edit-ticket-modal-controller';

type Props = {
  profileId: string;
  memberOptions: {
    label: string;
    value: string;
  }[];
  ticketId: string;
  initialValues: {
    subject: string;
    assigneeId: string;
    status: TicketStatus;
    priority: PriorityEnum;
    description: string;
  };
  isRaisedByMe: boolean;
};
export const editTicketSchema = createTicketSchema.omit({ workspaceId: true });
export const EditTicketForm = ({
  memberOptions,
  profileId,
  ticketId,
  initialValues,
  isRaisedByMe,
}: Props) => {
  const { mutateAsync } = useUpdateTicket();

  const { close } = useEditTicketModalController();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm<z.infer<typeof editTicketSchema>>({
    defaultValues: {
      assigneeId: initialValues.assigneeId,
      description: initialValues.description,
      priority: initialValues.priority,
      subject: initialValues.subject,
      status: initialValues.status,
      raisedId: profileId,
    },
    resolver: zodResolver(editTicketSchema),
  });

  const onSubmit = async (data: z.infer<typeof editTicketSchema>) => {
    if (!isRaisedByMe) {
      toaster.create({
        title: 'You are not authorized to edit this ticket',
        type: 'info',
        duration: 5000,
      });
      return;
    }
    await mutateAsync(
      { json: { ...data }, param: { ticketId } },
      {
        onSuccess: () => {
          close();
        },
      }
    );
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
