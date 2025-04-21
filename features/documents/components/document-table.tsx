'use client';

import { colors } from '@/constants';
import { DocumentType } from '@/types';
import {
  ButtonGroup,
  For,
  Heading,
  IconButton,
  Image,
  Pagination,
  Stack,
  Table,
} from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { DocumentAction } from './document-actions';
import { EllipsisVertical } from 'lucide-react';
import { format } from 'date-fns';
import { EmptyUi } from '@/components/ui/empty-ui';

type Props = {
  documents: DocumentType[];
  total: number;
};

export const DocumentTable = ({ documents, total }: Props) => {
  return (
    <Stack width="full" gap="5">
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
          <For
            each={documents}
            fallback={<EmptyUi text="No documents found for this project" />}
          >
            {(item) => (
              <Table.Row key={item.$id}>
                <Table.Cell
                  color={colors.black}
                  display={'flex'}
                  alignItems={'center'}
                >
                  <Image
                    alt="png"
                    src={'/pdf.png'}
                    width={'30px'}
                    height={'30px'}
                    objectFit={'contain'}
                  />
                  {item.name}
                </Table.Cell>
                <Table.Cell color={colors.black}>{item.uploadedBy}</Table.Cell>
                <Table.Cell color={colors.black}>
                  {format(item.$createdAt, 'PPP')}
                </Table.Cell>
                <Table.Cell color={colors.black}>
                  <DocumentAction documentId={item.$id} url={item.documentUrl}>
                    <EllipsisVertical
                      className="text-black size-4 cursor-pointer"
                      size={30}
                    />
                  </DocumentAction>
                </Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table.Root>

      <Pagination.Root count={total * 5} pageSize={10} page={1}>
        <ButtonGroup variant="ghost" size="sm" wrap="wrap">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <LuChevronLeft color={colors.black} />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton
                color={colors.black}
                variant={{ base: 'ghost', _selected: 'outline' }}
              >
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <LuChevronRight color={colors.black} />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Stack>
  );
};

const columns = ['Name', 'Uploaded by', 'Date', 'Actions'];
