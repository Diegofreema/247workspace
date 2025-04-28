import { usePaginateTicket } from '@/lib/nuqs/use-paginate-tickets';
import { TicketWithProfile } from '@/types';
import { ButtonGroup, IconButton, Pagination, Table } from '@chakra-ui/react';
import React from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

type Props = {
  tickets: TicketWithProfile[];
  total: number;
};

export const TicketTable = ({ tickets, total }: Props) => {
  const [page, setPage] = usePaginateTicket();
  return (
    <div>
      <Table.Root size="sm" variant="outline" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tickets.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell textAlign="end">{item.price}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination.Root count={total} pageSize={25} page={page}>
        <ButtonGroup variant="ghost" size="sm" wrap="wrap">
          <Pagination.PrevTrigger asChild>
            <IconButton onClick={() => setPage((page) => page - 1)}>
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
            <IconButton onClick={() => setPage((page) => page + 1)}>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </div>
  );
};
