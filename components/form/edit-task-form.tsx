import { colors } from '@/constants';
import { useUpdateTask } from '@/features/tasks/api/use-update-task';
import { editTaskSchema } from '@/features/tasks/schema';
import { useEditTaskModalController } from '@/lib/nuqs/use-editi-task-modal-contoller';
import { PriorityEnum, StatusEnum, TaskWithProjectAndAssignee } from '@/types';
import { Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
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
  initialValues: TaskWithProjectAndAssignee;
};

export const EditTaskForm = ({
  memberOptions,
  projectOptions,
  initialValues,
}: Props) => {
  const { mutateAsync } = useUpdateTask();

  const { close } = useEditTaskModalController();
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    control,
  } = useForm<z.infer<typeof editTaskSchema>>({
    defaultValues: {
      ...initialValues,
      dueDate: initialValues.dueDate
        ? new Date(initialValues.dueDate)
        : undefined,
    },
    resolver: zodResolver(editTaskSchema),
  });

  const onSubmit = async (data: z.infer<typeof editTaskSchema>) => {
    await mutateAsync(
      { json: data, param: { taskId: initialValues.$id } },
      {
        onSuccess: () => {
          router.refresh();
        },
      }
    );
    reset();
    await close();
  };
  const assigneeItem = memberOptions.map((member) => ({
    label: member.name,
    value: member.id,
  }));
  const projectItem = projectOptions.map((project) => ({
    label: project.name,
    value: project.id,
  }));

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
      <FormInput
        register={register}
        name="assigneeId"
        label="Assignee"
        errors={errors}
        placeholder="Select Assignee"
        required
        disabled={isSubmitting}
        variant={'select'}
        data={assigneeItem}
      />
      <FormInput
        register={register}
        name="status"
        label="Status"
        errors={errors}
        placeholder="Select status"
        required
        disabled={isSubmitting}
        variant={'select'}
        data={statusData}
      />
      <FormInput
        register={register}
        name="projectId"
        label="Project"
        errors={errors}
        placeholder="Select Project"
        required
        disabled={isSubmitting}
        variant={'select'}
        data={projectItem}
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
        label="Description"
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
          Update
        </Button>
      </FlexBox>
    </Stack>
  );
};

const statusData = [
  { label: 'Backlog', value: StatusEnum.BACKLOG },
  { label: 'In Progress', value: StatusEnum.IN_PROGRESS },
  { label: 'In Review', value: StatusEnum.IN_REVIEW },
  { label: 'Todo', value: StatusEnum.TODO },
  { label: 'Done', value: StatusEnum.DONE },
];

const priorityData = [
  { label: 'Urgent', value: PriorityEnum.URGENT },
  { label: 'Important', value: PriorityEnum.IMPORTANT },
  { label: 'Moderate', value: PriorityEnum.MODERATE },
  { label: 'Low', value: PriorityEnum.LOW },
  { label: 'Minimal', value: PriorityEnum.MINIMAL },
];
