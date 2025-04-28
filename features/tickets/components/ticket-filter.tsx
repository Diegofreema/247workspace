import { FlexBox } from '@/components/custom/flex-box';
import { ShadCnSelect } from '@/components/form/ShandCnSelect';
import { useTicketFilters } from '@/lib/nuqs/use-data-filter';
import { TicketStatus } from '@/types';
import { IconListCheck, IconUser } from '@tabler/icons-react';

type Props = {
  allAssignees: { label: string; value: string }[];
};

export const TicketFilter = ({ allAssignees }: Props) => {
  const [{ assigneeId, status }, setFilters] = useTicketFilters();

  const onStatusChange = (value: string) => {
    setFilters({
      status: value === 'all' ? null : (value as TicketStatus),
    });
  };
  const onAssigneeChange = (value: string) => {
    setFilters({
      assigneeId: value === 'all' ? null : value,
    });
  };

  return (
    <FlexBox gap={2} flexDir={{ base: 'column', md: 'row' }}>
      <ShadCnSelect
        placeholder="Select status"
        onValueChange={onStatusChange}
        data={statusData}
        value={status ?? undefined}
        disabled={false}
        icon={IconListCheck}
      />
      <ShadCnSelect
        placeholder="All assignees"
        onValueChange={onAssigneeChange}
        data={[{ label: 'All assignees', value: 'all' }, ...allAssignees]}
        value={assigneeId ?? undefined}
        disabled={false}
        icon={IconUser}
      />
    </FlexBox>
  );
};

export const statusData = [
  { label: 'All statuses', value: 'all' },
  { label: 'Unassigned', value: TicketStatus.UNASSIGNED },
  { label: 'Todo', value: TicketStatus.TODO },
  { label: 'In progress', value: TicketStatus.IN_PROGRESS },
  { label: 'In review', value: TicketStatus.IN_REVIEW },
  { label: 'Resolved', value: TicketStatus.RESOLVED },
];
