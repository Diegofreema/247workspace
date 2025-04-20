'use client';

import { colors } from '@/constants';
import { DocumentType } from '@/types';
import {
  ButtonGroup,
  Heading,
  IconButton,
  Pagination,
  Stack,
  Table,
} from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { DocumentAction } from './document-actions';
import { EllipsisVertical } from 'lucide-react';

type Props = {
  documents: DocumentType[];
  total: number;
};

export const DocumentTable = ({ documents, total }: Props) => {
  return (
    <Stack width="full" gap="5">
      <Heading size="xl">Products</Heading>
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row bg={colors.lightGrey}>
            {columns.map((column, i) => {
              const isLast = i === columns.length - 1;
              return (
                <Table.ColumnHeader
                  key={i}
                  textAlign={isLast ? 'end' : 'start'}
                  color={colors.black}
                  fontWeight={600}
                >
                  {column}
                </Table.ColumnHeader>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell color={colors.black}>{item.name}</Table.Cell>
              <Table.Cell color={colors.black}>{item.category}</Table.Cell>
              <Table.Cell color={colors.black} textAlign="end">
                {item.price}
              </Table.Cell>
              <DocumentAction documentId="1">
                <EllipsisVertical />
              </DocumentAction>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination.Root count={items.length * 5} pageSize={5} page={1}>
        <ButtonGroup variant="ghost" size="sm" wrap="wrap">
          <Pagination.PrevTrigger asChild>
            <IconButton>
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
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Stack>
  );
};

const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Coffee Maker', category: 'Home Appliances', price: 49.99 },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
  { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 },
];

const columns = ['Document name', 'Uploaded by', 'Date uploaded', 'Actions'];
