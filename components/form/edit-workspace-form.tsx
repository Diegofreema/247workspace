import { Suspense } from 'react';
import { CreateWorkspaceModal } from '../modals/create-workspace-modal';

export const CreateWorkspaceForm = () => {
  return (
    <Suspense fallback={null}>
      <CreateWorkspaceModal />
    </Suspense>
  );
};
