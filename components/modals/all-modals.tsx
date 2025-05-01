'use client';

import { useEffect, useState } from 'react';
import { CreateWorkspaceForm } from '../form/create-workspace-form';
import { CreateDocumentModal } from './create-document-modal';
import { CreateProjectModal } from './create-project-modal';
import { CreateTaskModal } from './create-task-modal';
import { EditProjectModal } from './edit-project-modal';
import { EditTaskModal } from './edit-task-modal';
import { CreateFeedbackModal } from './create-feedback-modal';
import { CreateTicketModal } from './raise-ticket-modal';
import { EditTicketModal } from './edit-ticket-modal';
import { EditCommentModal } from '@/components/modals/edit-comment-modal';
import { CreateWorkspaceFolder } from '@/features/documents/components/modal/create-workspace-folder-modal';
import { EditWorkspaceFolderModal } from '@/features/documents/components/modal/edit-workspace-folder-modal';
import { UploadNewVersionModal } from '@/features/documents/components/modal/upload-new-version';

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
      <CreateFeedbackModal />
      <CreateTicketModal />
      <EditTicketModal />
      <EditCommentModal />
      <CreateWorkspaceFolder />
      <EditWorkspaceFolderModal />
      <UploadNewVersionModal />
    </>
  );
};
