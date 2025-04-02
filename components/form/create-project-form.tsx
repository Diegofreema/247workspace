import { Suspense } from 'react';
import { CreateProjectModal } from '../modals/create-project-modal';

export const CreateProjectForm = () => {
  return (
    <Suspense fallback={null}>
      <CreateProjectModal />
    </Suspense>
  );
};
