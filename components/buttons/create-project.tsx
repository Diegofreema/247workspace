import { colors } from '@/constants';
import { Button } from '../custom/custom-button';
import { ButtonProps } from '@chakra-ui/react';

type Props = ButtonProps & {};
export const CreateProject = ({ ...props }: Props) => {
  return (
    <Button {...props} bg={colors.purple} px={2}>
      Create a Project
    </Button>
  );
};
