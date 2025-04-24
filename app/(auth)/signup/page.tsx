import { FlexBox } from '@/components/custom/flex-box';
import { getLoggedInUser } from '@/features/auth/queries';
import { SignInForm } from '@/components/form/sign-in-form';
import { InstructionHeading } from '@/components/ui/instruction-heading';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

const SignIn = async () => {
  const { user } = await getLoggedInUser();

  if (user) redirect('/');
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
        title="Welcome to 247workspace"
        subtitle="Please sign in below with google or github"
      />
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </FlexBox>
  );
};

export default SignIn;
