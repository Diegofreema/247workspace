import { Image } from '@chakra-ui/react';
import { FlexBox } from '../custom/flex-box';
import { Title } from '../custom/title';
import { colors } from '@/constants';

type Props = {
  isPurple?: boolean;
};

export const Logo = ({ isPurple = false }: Props) => {
  const imageSrc = isPurple ? '/logo.png' : '/logo.svg';
  const textColor = isPurple ? colors.purple : colors.white;
  return (
    <FlexBox gap={3} alignItems={'center'}>
      <Image
        src={imageSrc}
        alt="logo"
        width={35}
        height={35}
        objectFit={'contain'}
      />
      <Title as="h2" color={textColor} fontSize={isPurple ? '20px' : '30px'}>
        247workspace
      </Title>
    </FlexBox>
  );
};
