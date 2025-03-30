import { FlexBox } from '@/components/custom/flex-box';
import { SignInForm } from '@/components/form/sign-in-form';
import { InstructionHeading } from '@/components/ui/instruction-heading';
import { Suspense } from 'react';

const SignIn = () => {
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
        subtitle="Use your email to sign to get access to your Dashboard"
      />
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </FlexBox>
  );
};

export default SignIn;
