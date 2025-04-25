import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { getLoggedInUser } from '@/features/auth/queries';
import { ProjectDisplay } from '@/features/projects/components/project-display';
import { getProject } from '@/features/projects/queries';
import { getProfile } from '@/features/workspaces/queries';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    projectId: string;
  };
};
const page = async ({ params }: Props) => {
  const { user, profile } = await getLoggedInUser();

  if (!user) redirect('/signup');
  const { project } = await getProject({ projectId: params.projectId });

  return (
    <WrapperWithPadding className="bg-lightGrey">
      <ProjectDisplay
        project={project}
        userId={profile?.userId || ''}
        memberId={user.$id}
      />
    </WrapperWithPadding>
  );
};

export default page;
