import { CustomText } from '@/components/custom/title';
import { Badge } from '@/components/ui/badge';
import { colors } from '@/constants';
import { usePaginateTicket } from '@/lib/nuqs/use-paginate-tickets';
import { TicketWithProfile } from '@/types';
import { snakeCaseToTitleCase } from '@/utils/helper';
import { ButtonGroup, IconButton, Pagination, Table } from '@chakra-ui/react';
import { format } from 'date-fns';
import { EllipsisVertical } from 'lucide-react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { TicketAction } from './ticket-action';

type Props = {
  tickets: TicketWithProfile[];
  total: number;
};
export const LIMIT = 10;
export const TicketTable = ({ tickets, total }: Props) => {
  const [page, setPage] = usePaginateTicket();
  const disableNextButton = page === Math.ceil(total / LIMIT) || total === 0;
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
            <Table.Row key={item.$id} bg="white" className="!bg-white">
              <Table.Cell color={colors.black} className="!bg-white">
                Tck{item.$id}
              </Table.Cell>
              <Table.Cell color={colors.black} className="!bg-white">
                {item.subject}
              </Table.Cell>
              <Table.Cell color={colors.black} className="!bg-white">
                {item.raisedBy.name}
              </Table.Cell>
              <Table.Cell color={colors.black} className="!bg-white">
                {item.assignee.name}
              </Table.Cell>
              <Table.Cell color={colors.black} className="!bg-white">
                {format(item.$createdAt, 'PPP')}
              </Table.Cell>
              <Table.Cell color={colors.black} className="!bg-white">
                <Badge variant={item.priority}>
                  {snakeCaseToTitleCase(item.priority)}
                </Badge>
              </Table.Cell>
              <Table.Cell color={colors.black} className="!bg-white">
                {/* @ts-ignore */}
                <Badge variant={item.status}>
                  {snakeCaseToTitleCase(item.status)}
                </Badge>
              </Table.Cell>
              <Table.Cell color={colors.black} className="!bg-white">
                <TicketAction ticketId={item.$id}>
                  <EllipsisVertical color={colors.black} size={20} />
                </TicketAction>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      {total === 0 && (
        <CustomText
          textAlign={'center'}
          color={colors.black}
          fontWeight={'bold'}
          fontSize={{ base: 20, md: LIMIT }}
          mt={10}
        >
          No tickets yet
        </CustomText>
      )}

      <Pagination.Root
        count={total}
        pageSize={LIMIT}
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
              <IconButton
                variant={{ base: 'ghost', _selected: 'outline' }}
                onClick={() => setPage(page.value)}
              >
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton
              onClick={() => setPage((page) => page + 1)}
              disabled={disableNextButton}
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
  'Priority',
  'Status',
  'Action',
];
