import Image from 'next/image';
import { FlexBox } from '../custom/flex-box';
import { Title } from '../custom/title';

export const Logo = () => {
  return (
    <FlexBox gap={3} alignItems={'center'}>
      <Image
        src="/logo.svg"
        alt="logo"
        width={100}
        height={50}
        className="w-[50px] h-[50px]"
      />
      <Title as="h2">247workspace</Title>
    </FlexBox>
  );
};
