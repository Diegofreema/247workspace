import { ConfirmDialog } from '@/components/modals/confirm-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { colors } from '@/constants';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { ExternalLinkIcon, Pencil, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useEditTaskModalController } from '@/lib/nuqs/use-editi-task-modal-contoller';
import { useDeleteTicket } from '../api/use-delete-ticket';

type Props = {
  ticketId: string;
  children: React.ReactNode;
};

export const TicketAction = ({ children, ticketId }: Props) => {
  const { mutateAsync, isPending } = useDeleteTicket();
  const { open } = useEditTaskModalController();
  const [isOpen, setOpen] = useState(false);
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const isLoading = isPending;
  const onDelete = async () => {
    await mutateAsync(
      { param: { ticketId } },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  const onOpenTicket = () => {
    router.push(`/workspaces/${workspaceId}/tickets/${ticketId}`);
  };

  return (
    <>
      <ConfirmDialog
        isOpen={isOpen}
        setIsOpen={setOpen}
        onCancel={() => setOpen(false)}
        isSubmitting={isPending}
        title="Delete ticket"
        subtitle="Are you sure you want to delete this ticket?, this action is irreversible."
        confirmButtonText="Delete"
        onConfirm={onDelete}
        btnColor={colors.red}
      />
      <div className="flex justify-end">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 text-black bg-white">
            <DropdownMenuItem
              onClick={onOpenTicket}
              disabled={isLoading}
              className="font-medium p-[10px]"
            >
              <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
              Ticket Details
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => open(ticketId)}
              disabled={isLoading}
              className="font-medium p-[10px]"
            >
              <Pencil className="size-4 mr-2 stroke-2" />
              Edit ticket
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setOpen(true)}
              disabled={isLoading}
              className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
            >
              <Trash className="size-4 mr-2 stroke-2" />
              Delete ticket
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
