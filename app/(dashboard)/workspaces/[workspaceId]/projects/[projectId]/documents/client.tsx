'use client';

import { Heading } from '@/components/ui/heading';
import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { useProjectId } from '@/hooks/useProjectId';
import React from 'react';

export const DocumentClient = () => {
  const projectId = useProjectId();
  return (
    <WrapperWithPadding className="bg-lightGrey">
      <Heading
        title="Documents"
        subTitle="Manage and upload project documents here"
      />
    </WrapperWithPadding>
  );
};
