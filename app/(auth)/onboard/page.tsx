import { FlexBox } from '@/components/custom/flex-box';
import { getLoggedInUser } from '@/features/auth/queries';
import { SignInForm } from '@/components/form/sign-in-form';
import { InstructionHeading } from '@/components/ui/instruction-heading';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { getProfile } from '@/features/workspaces/queries';
import { OnboardForm } from '@/components/form/onboard-form';

const Onboard = async () => {
  const user = await getLoggedInUser();

  if (!user) redirect('/sign-in');
  console.log(user);

  const profile = await getProfile(user?.$id);
  if (profile) {
    redirect('/');
  }
  return (
    <FlexBox
      mx="auto"
      width={{ base: '95%', md: '60%' }}
      flexDirection={'column'}
      justifyContent={'center'}
      h={'100%'}
      gap={6}
    >
      <InstructionHeading
        title="Set up your profile"
        subtitle="Please fill in your details to get started"
      />
      <Suspense fallback={null}>
        <OnboardForm initialValue={{ email: user.email, name: user.name }} />
      </Suspense>
    </FlexBox>
  );
};

export default Onboard;
