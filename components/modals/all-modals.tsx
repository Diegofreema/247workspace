'use client';

import { useEffect, useState } from 'react';
import { CreateWorkspaceForm } from '../form/create-workspace-form';
import { CreateProjectModal } from './create-project-modal';
import { CreateTaskModal } from './create-task-modal';
import { EditTaskModal } from './edit-task-modal';
import { EditProjectModal } from './edit-project-modal';
import { CreateDocumentModal } from './create-document-modal';
import { ViewDocumentModal } from './view-document-modal';

export const AllModals = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <>
      <CreateWorkspaceForm />
      <CreateProjectModal />
      <CreateTaskModal />
      <EditTaskModal />
      <EditProjectModal />
      <CreateDocumentModal />
      <ViewDocumentModal />
    </>
  );
};
