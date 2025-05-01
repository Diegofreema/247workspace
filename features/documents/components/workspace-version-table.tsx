'use client';

import { CustomText } from '@/components/custom/title';
import { EmptyUi } from '@/components/ui/empty-ui';
import { colors } from '@/constants';
import { usePaginate } from '@/lib/nuqs/use-paginate-tickets';
import { WorkspaceDocumentType } from '@/types';
import {
  ButtonGroup,
  For,
  IconButton,
  Image,
  Pagination,
  Stack,
  Table,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { EllipsisVertical } from 'lucide-react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { DocumentAction } from './document-actions';

type Props = {
  documents: WorkspaceDocumentType[];
  total: number;
};
export const LIMIT = 25;

export const VersionTable = ({ documents, total }: Props) => {
  const [page, setPage] = usePaginate();
  const disableNextButton = page === Math.ceil(total / LIMIT) || total === 0;
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
                  {format(item.createdAt ?? item.$createdAt, 'PP hh:mm a')}
                </Table.Cell>
                <Table.Cell color={colors.black}>
                  {format(item.$updatedAt, 'PP hh:mm a')}
                </Table.Cell>
                <Table.Cell color={colors.black}>{item.version}</Table.Cell>

                <Table.Cell color={colors.black}>
                  <DocumentAction
                    versionId={item.versionId}
                    url={item.documentUrl}
                    hideVersionHistory
                  >
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

      {total === 0 && (
        <CustomText
          textAlign={'center'}
          color={colors.black}
          fontWeight={'bold'}
          fontSize={{ base: 20, md: LIMIT }}
          mt={10}
        >
          No documents found for this workspace
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
    </Stack>
  );
};

const columns = [
  'Name',
  'Uploaded by',
  'Date',
  'Last Modified',
  'Version',
  'Actions',
];
