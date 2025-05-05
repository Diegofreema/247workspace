import { colors } from '@/constants';
import { useCreateTask } from '@/features/tasks/api/use-create-task';
import { createTaskSchema } from '@/features/tasks/schema';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import {
  useCreateTaskModalController,
  useSetProjectId,
  useSetTask,
} from '@/lib/nuqs/use-create-task';
import { PriorityEnum, StatusEnum } from '@/types';
import { Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../custom/custom-button';
import { FlexBox } from '../custom/flex-box';
import { FormInput, FormInputDate } from './form-input';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { TextCounter } from '../text-counter';

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
const NAME_MAX_LENGTH = 50;
const DESCRIPTION_MAX_LENGTH = 300;
export const CreateTaskForm = ({ memberOptions, projectOptions }: Props) => {
  const { mutateAsync } = useCreateTask();
  const workspaceId = useWorkspaceId();
  const { close } = useCreateTaskModalController();
  const { onRemoveProjectId, projectId } = useSetProjectId();
  const { status, onRemoveStatus } = useSetTask();
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    control,
    watch,
  } = useForm<z.infer<typeof createTaskSchema>>({
    defaultValues: {
      workspaceId,
      status: status ? status : StatusEnum.BACKLOG,
      projectId: projectId ? projectId : '',
      name: '',
      description: '',
    },
    resolver: zodResolver(createTaskSchema),
  });
  const { name, description } = watch();
  const onSubmit = async (data: z.infer<typeof createTaskSchema>) => {
    await mutateAsync(
      { json: { ...data, workspaceId } },
      {
        onSuccess: () => {
          router.refresh();
          reset();
          onRemoveProjectId();
        },
      }
    );

    onRemoveStatus();
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

  const nameLength = name.length;
  const descriptionLength = description?.length;
  return (
    <ScrollArea className="h-[600px] px-4">
      <Stack gap={4}>
        <Stack gap={3}>
          <FormInput
            register={register}
            name="name"
            label="Task name"
            errors={errors}
            placeholder="My task"
            required
            disabled={isSubmitting}
            maxLength={50}
          />
          <TextCounter maxLength={NAME_MAX_LENGTH} length={nameLength} />
        </Stack>
        <FlexBox
          alignItems={{ base: 'start', md: 'center' }}
          flexDir={{ base: 'column', md: 'row' }}
          gap={3}
        >
          <FormInput
            register={register}
            name="assigneeId"
            label="Assignee"
            errors={errors}
            placeholder="Choose Assignee"
            required
            disabled={isSubmitting}
            variant={'select'}
            data={assigneeItem}
          />
          <FormInputDate
            control={control}
            name="dueDate"
            label="Due date"
            errors={errors}
            required
            disabled={isSubmitting}
          />
        </FlexBox>

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
        <Stack gap={4}>
          <FormInput
            register={register}
            name="description"
            label="Task Description"
            errors={errors}
            placeholder="About this task..."
            disabled={isSubmitting}
            variant="textarea"
            maxLength={300}
          />
          <TextCounter
            maxLength={DESCRIPTION_MAX_LENGTH}
            length={descriptionLength || 0}
          />
        </Stack>
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
      <ScrollBar className="cursor-pointer" />
    </ScrollArea>
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
