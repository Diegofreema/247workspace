import { WorkspaceFolderType } from '@/types';
import React from 'react';

type Props = {
  folders: WorkspaceFolderType[];
  total: number;
};

export const Folders = ({ folders, total }: Props) => {
  return <div>Folders</div>;
};
