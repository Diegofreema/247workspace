import { FlexBox } from '@/components/custom/flex-box';
import { colors } from '@/constants';
import { ProjectFolderType } from '@/types';
import { Card } from '@chakra-ui/react';
import { IconFolder } from '@tabler/icons-react';
import { EllipsisVertical } from 'lucide-react';
import { WorkspaceDocumentAction } from './workspace-document-action';

type Props = {
  folder: ProjectFolderType;
};

export const ProjectFolderCard = ({ folder }: Props) => {
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
          <WorkspaceDocumentAction
            folderId={folder.$id}
            folderName={folder.folderName}
          >
            <EllipsisVertical color={colors.black} />
          </WorkspaceDocumentAction>
        </FlexBox>
      </Card.Body>
    </Card.Root>
  );
};
