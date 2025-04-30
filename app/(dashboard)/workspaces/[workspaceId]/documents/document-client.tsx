'use client';

import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { WorkspaceDocumentDisplay } from '@/features/documents/components/workspace-document-display';
import React from 'react';

export const DocumentClient = () => {
  return (
    <WrapperWithPadding className="bg-lightGrey">
      <WorkspaceDocumentDisplay />
    </WrapperWithPadding>
  );
};
