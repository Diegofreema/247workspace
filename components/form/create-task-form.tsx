import { colors } from "@/constants";
import { useCreateTask } from "@/features/tasks/api/use-create-task";
import { createTaskSchema } from "@/features/tasks/schema";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { useCreateTaskModalController } from "@/lib/nuqs/use-create-task";
import { Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../custom/custom-button";
import { FlexBox } from "../custom/flex-box";
import { FormInput, FormInputDate } from "./form-input";
import { PriorityEnum, StatusEnum } from "@/types";

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
    watch,
  } = useForm<z.infer<typeof createTaskSchema>>({
    defaultValues: {
      workspaceId,
    },
    resolver: zodResolver(createTaskSchema),
  });

  const data = watch();
  console.log(data);
  const onSubmit = async (data: z.infer<typeof createTaskSchema>) => {
    await mutateAsync({ json: { ...data, workspaceId } });
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
  console.log({ errors });
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
        variant={"select"}
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
        variant={"select"}
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
        variant={"select"}
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
        variant={"select"}
        data={priorityData}
      />
      <FlexBox>
        <Button
          variant="outline"
          width={"fit-content"}
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
          width={"fit-content"}
        >
          Create
        </Button>
      </FlexBox>
    </Stack>
  );
};

const statusData = [
  { label: "Backlog", value: StatusEnum.BACKLOG },
  { label: "In Progress", value: StatusEnum.IN_PROGRESS },
  { label: "In Review", value: StatusEnum.IN_REVIEW },
  { label: "Todo", value: StatusEnum.TODO },
  { label: "Done", value: StatusEnum.DONE },
];

const priorityData = [
  { label: "Urgent", value: PriorityEnum.URGENT },
  { label: "Important", value: PriorityEnum.IMPORTANT },
  { label: "Moderate", value: PriorityEnum.MODERATE },
  { label: "Low", value: PriorityEnum.LOW },
  { label: "Minimal", value: PriorityEnum.MINIMAL },
];
