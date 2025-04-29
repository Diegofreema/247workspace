import { TicketStatus } from '@/types';
import { ShadCnSelect } from '@/components/form/ShandCnSelect';
import { useState } from 'react';
import { useUpdateTicket } from '@/features/tickets/api/use-edit-ticket';

type Props = {
  id: string;
  status: TicketStatus;
  profileId: string;
};

export const TicketStatusSelector = ({ status, id, profileId }: Props) => {
  const [value, setValue] = useState<TicketStatus>(status);

  const { mutateAsync, isPending } = useUpdateTicket();
  const onValueChange = async (v: string) => {
    setValue(v as TicketStatus);
    await mutateAsync(
      {
        json: { status: value, raisedId: profileId },
        param: { ticketId: id },
      },
      {
        onError: () => {
          setValue(status);
        },
      }
    );
  };

  return (
    <div>
      <ShadCnSelect
        data={data}
        placeholder={'Edit status'}
        value={value}
        onValueChange={onValueChange}
        disabled={isPending}
        text={'Status: '}
      />
    </div>
  );
};

const data = [
  { label: 'Todo', value: TicketStatus.TODO },
  { label: 'In progress', value: TicketStatus.IN_PROGRESS },
  { label: 'In review', value: TicketStatus.IN_REVIEW },
  { label: 'Resolved', value: TicketStatus.RESOLVED },
];
