import { LoaderCircle } from 'lucide-react';
import { FlexBox } from '../custom/flex-box';
import { Logo } from './logo';

export const Loading = () => {
  return (
    <FlexBox minH={'100dvh'} flexDirection={'column'} bg="white" width={'100%'}>
      <FlexBox
        width="100%"
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <LoaderCircle className="animate-spin size-10 text-purple" />
      </FlexBox>
      <Logo isPurple className="self-center mb-10" />
    </FlexBox>
  );
};
