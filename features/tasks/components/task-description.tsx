import { useState } from 'react';
import { TaskWithProjectAndAssignee } from '@/types';
import { Pencil, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUpdateTask } from '../api/use-update-task';
import { Textarea } from '@chakra-ui/react';

type Props = {
  task: TaskWithProjectAndAssignee;
};

export const TaskDescription = ({ task }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description);
  const { mutateAsync, isPending } = useUpdateTask();

  const handleSave = () => {
    mutateAsync(
      {
        json: { description: value },
        param: { taskId: task.$id },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };
  return (
    <div className="p-4 rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-black">Overview</p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size={'sm'}
          variant={'secondary'}
          className="bg-purple"
        >
          {isEditing ? (
            <XIcon className="size-4 mr-2" />
          ) : (
            <Pencil className="size-4 mr-2" />
          )}
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>
      <Separator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a description..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            disabled={isPending}
            className="text-black p-2"
          />
          <Button
            onClick={handleSave}
            size={'sm'}
            disabled={isPending}
            className="w-fit ml-auto"
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      ) : (
        <div className="text-black">
          {task.description || <span>No description set</span>}
        </div>
      )}
    </div>
  );
};
