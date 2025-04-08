import { colors } from '@/constants';
import { FlexBox } from '../custom/flex-box';
import { Title } from '../custom/title';
import { LogoSvg } from '../svg-icons/logo';

type Props = {
  isPurple?: boolean;
  className?: string;
};

export const Logo = ({ isPurple = false, className }: Props) => {
  // const imageSrc = isPurple ? '/logo.png' : '/logo.svg';
  const textColor = isPurple ? colors.purple : colors.white;
  return (
    <FlexBox gap={3} alignItems={'center'} className={className}>
      <LogoSvg isPurple={isPurple} />
      <Title as="h2" color={textColor} fontSize={isPurple ? '20px' : '30px'}>
        247workspace
      </Title>
    </FlexBox>
  );
};
