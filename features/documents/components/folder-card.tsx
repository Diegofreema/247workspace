import { FlexBox } from '@/components/custom/flex-box';
import { colors } from '@/constants';
import { WorkspaceFolderType } from '@/types';
import { Card } from '@chakra-ui/react';
import { IconFolder } from '@tabler/icons-react';
import React from 'react';
import { WorkspaceDocumentAction } from './workspace-document-action';
import { EllipsisVertical } from 'lucide-react';

type Props = {
  folder: WorkspaceFolderType;
};

export const FolderCard = ({ folder }: Props) => {
  return (
    <Card.Root bg={colors.white} boxShadow={'sm'}>
      <Card.Body>
        <FlexBox alignItems={'center'} justifyContent={'space-between'}>
          <Card.Title
            color={colors.black}
            display="flex"
            alignItems={'center'}
            gap={2}
          >
            <IconFolder color={colors.purple} />
            {folder.folderName}
          </Card.Title>
          <WorkspaceDocumentAction folderId={folder.$id}>
            <EllipsisVertical color={colors.black} />
          </WorkspaceDocumentAction>
        </FlexBox>
      </Card.Body>
    </Card.Root>
  );
};
