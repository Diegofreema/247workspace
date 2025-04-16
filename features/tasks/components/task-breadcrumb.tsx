import { FlexBox } from '@/components/custom/flex-box';
import { Button } from '@/components/ui/button';
import { ProfileAvatar } from '@/components/ui/profile-avatar';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { Project } from '@/types';
import { ChevronRightIcon, Trash } from 'lucide-react';
import { Link } from 'next-view-transitions';
import { useDeleteTask } from '../api/use-delete-task';
import { ConfirmDialog } from '@/components/modals/confirm-dialog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { colors } from '@/constants';

type Props = {
  project: Project;
  taskName: string;
  taskId: string;
};

export const TaskBreadcrumb = ({ project, taskName, taskId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { mutateAsync, isPending } = useDeleteTask();
  const onDelete = async () => {
    await mutateAsync(
      { param: { taskId } },
      {
        onSuccess: () => {
          setIsOpen(false);
          router.back();
        },
      }
    );
  };
  const link = `/workspace/${workspaceId}/projects/${project.$id}`;
  return (
    <>
      <ConfirmDialog
        confirmButtonText="Delete Task"
        title="Delete Task?"
        subtitle="Are you sure you want to delete this task?, this action cannot be undone"
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={onDelete}
        setIsOpen={setIsOpen}
        isSubmitting={isPending}
        btnColor={colors.red}
      />
      <FlexBox alignItems={'center'} gap={2}>
        <ProfileAvatar name={project.name} imageUrl={project.imageUrl} />
        <Link href={link}>
          <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
            {project.name}
          </p>
        </Link>
        <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
        <p className="text-sm lg:text-lg font-semibold text-black">
          {taskName}
        </p>
        <Button
          onClick={() => setIsOpen(true)}
          className="ml-auto"
          variant={'destructive'}
          size={'sm'}
        >
          <Trash className="size-4 lg:mr-2" />
          <span className="hidden lg:block">Delete Task</span>
        </Button>
      </FlexBox>
    </>
  );
};
