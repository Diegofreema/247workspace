import { Box } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return <Box className="min-h-screen bg-white">{children}</Box>;
};

export default AuthLayout;
