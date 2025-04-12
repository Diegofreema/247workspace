import { getLoggedInUser } from '@/features/auth/queries';
import { ProjectDisplay } from '@/features/projects/components/project-display';
import { getProject } from '@/features/projects/queries';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    projectId: string;
  };
};
const page = async ({ params }: Props) => {
  const user = await getLoggedInUser();

  if (!user) redirect('/sign-in');
  const project = await getProject({ projectId: params.projectId });

  return (
    <div className="text-black p-6">
      <ProjectDisplay project={project} />
    </div>
  );
};

export default page;
