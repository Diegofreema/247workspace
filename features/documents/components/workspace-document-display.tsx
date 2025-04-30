import { WorkspaceFolderType } from '@/types';
import React from 'react';

type Props = {
  folders: WorkspaceFolderType[];
  total: number;
};

export const WorkspaceDocumentDisplay = ({ folders, total }: Props) => {
  return <div>WorkspaceDocumentDisplay</div>;
};
