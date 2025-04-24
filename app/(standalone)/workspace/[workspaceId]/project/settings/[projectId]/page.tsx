import { getLoggedInUser } from '@/features/auth/queries';
import { DeleteProjectCard } from '@/features/projects/components/delete-project-card';
import { EditProjectCard } from '@/features/projects/components/edit-project-card';
import { getProject } from '@/features/projects/queries';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

type Props = {
  params: {
    projectId: string;
  };
};

const page = async ({ params }: Props) => {
  const user = await getLoggedInUser();
  if (!user) {
    redirect('/signup');
  }

  const project = await getProject({ projectId: params.projectId });
  return (
    <div className="w-full lg:max-w-xl flex flex-col gap-y-4">
      <Suspense fallback={null}>
        <EditProjectCard initialValue={project} />
      </Suspense>
      <Suspense fallback={null}>
        <DeleteProjectCard />
      </Suspense>
    </div>
  );
};

export default page;
