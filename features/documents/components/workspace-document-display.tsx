import { Heading } from '@/components/ui/heading';
import { WorkspaceFolderType } from '@/types';
import React from 'react';
import { Folders } from './folders';
import { FolderActions } from './folder-actions';
import { CustomText } from '@/components/custom/title';
import { colors } from '@/constants';
import { useFolderModalController } from '../hooks/use-folder-modal-controller';

type Props = {
  folders: WorkspaceFolderType[];
  total: number;
};

export const WorkspaceDocumentDisplay = ({ folders, total }: Props) => {
  return (
    <div>
      <Heading title="Folders" subTitle="View your folders here" />
      <FolderActions />
      {total === 0 && (
        <CustomText
          color={colors.black}
          fontWeight={'bold'}
          textAlign={'center'}
          mt={10}
        >
          No folders yet
        </CustomText>
      )}
      <Folders folders={folders} total={total} />
    </div>
  );
};
