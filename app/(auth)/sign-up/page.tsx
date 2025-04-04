import { Suspense } from 'react';

import { FlexBox } from '@/components/custom/flex-box';
import { SignUpForm } from '@/components/form/sign-up-form';
import { InstructionHeading } from '@/components/ui/instruction-heading';
import { getLoggedInUser } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const SignUp = async () => {
  const user = await getLoggedInUser();

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
        title="Create an account"
        subtitle="Start using our service by creating an account to get started"
      />
      <Suspense fallback={null}>
        <SignUpForm />
      </Suspense>
    </FlexBox>
  );
};

export default SignUp;
