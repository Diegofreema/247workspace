import { Loading } from '@/components/ui/loading';
import { WrapperWithPadding } from '@/components/ui/wrapper-padding';
import { useGetProfile } from '@/features/profile/api/use-get-profile';
import { ProfileCard } from '@/features/profile/components/profile-card';
import { useProfileId } from '@/hooks/use-profile-id';

export const ProfilePageClient = () => {
  const profileId = useProfileId();
  const { data, isPending, isError } = useGetProfile({ profileId });
  if (isError) {
    throw new Error('Error fetching profile');
  }

  if (isPending) {
    return <Loading />;
  }
  return (
    <WrapperWithPadding>
      <ProfileCard data={data} />
    </WrapperWithPadding>
  );
};
