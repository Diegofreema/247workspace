import { CustomText } from '@/components/custom/title';
import { colors } from '@/constants';
import { usePaginateTicket } from '@/lib/nuqs/use-paginate-tickets';
import { TicketWithProfile } from '@/types';
import { snakeCaseToTitleCase } from '@/utils/helper';
import { ButtonGroup, IconButton, Pagination, Table } from '@chakra-ui/react';
import { format } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { TicketAction } from './ticket-action';

type Props = {
  tickets: TicketWithProfile[];
  total: number;
};

export const TicketTable = ({ tickets, total }: Props) => {
  const [page, setPage] = usePaginateTicket();
  return (
    <div>
      <Table.Root size="sm" variant="outline" striped>
        <Table.Header bg={colors.milk} border={'none'}>
          <Table.Row border={'none'}>
            {header.map((item, index) => {
              const isLast = index === header.length - 1;
              return (
                <Table.ColumnHeader
                  key={item}
                  color={colors.black}
                  textAlign={isLast ? 'end' : 'start'}
                  fontWeight={'bold'}
                >
                  {item}
                </Table.ColumnHeader>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tickets.map((item) => (
            <Table.Row key={item.$id}>
              <Table.Cell>Tck{item.subject}</Table.Cell>
              <Table.Cell>{item.raisedBy.name}</Table.Cell>
              <Table.Cell>{item.assignee.name}</Table.Cell>
              <Table.Cell>{format(item.$createdAt, 'PPP')}</Table.Cell>
              <Table.Cell>{snakeCaseToTitleCase(item.status)}</Table.Cell>
              <Table.Cell>
                <TicketAction ticketId={item.$id}>
                  <MoreHorizontal color={colors.black} size={30} />
                </TicketAction>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <CustomText
        textAlign={'center'}
        color={colors.black}
        fontWeight={'bold'}
        fontSize={{ base: 20, md: 25 }}
        mt={10}
      >
        No tickets yet
      </CustomText>

      <Pagination.Root
        count={total}
        pageSize={25}
        page={page}
        color={colors.black}
      >
        <ButtonGroup variant="ghost" size="sm" wrap="wrap">
          <Pagination.PrevTrigger asChild>
            <IconButton
              onClick={() => setPage((page) => page - 1)}
              disabled={page === 1}
            >
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton
              onClick={() => setPage((page) => page + 1)}
              disabled={total === 0}
            >
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </div>
  );
};

const header = [
  'Tacking ID',
  'Subject',
  'Raised by',
  'Assigned to',
  'Raised',
  'Status',
  'Action',
];
