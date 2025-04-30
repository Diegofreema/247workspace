import { Heading } from '@/components/ui/heading';
import { WorkspaceFolderType } from '@/types';
import React from 'react';
import { Folders } from './folders';
import { FolderActions } from './folder-actions';

type Props = {
  folders: WorkspaceFolderType[];
  total: number;
};

export const WorkspaceDocumentDisplay = ({ folders, total }: Props) => {
  return (
    <div>
      <Heading title="Folders" subTitle="View your folders here" />
      <FolderActions />
      <Folders folders={folders} total={total} />
    </div>
  );
};
