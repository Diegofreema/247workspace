import React from 'react';
import { Aside } from './_components/Aside';
import { Box } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="min-h-screen bg-white">
      <Box className="mx-auto max-w-[95%] py-4 flex min-h-screen">
        <aside className="md:basis-[40%] hidden md:block flex-1">
          <Aside />
        </aside>
        <div className="md:basis-[60%] basis-[100%] ">{children}</div>
      </Box>
    </main>
  );
};

export default AuthLayout;
