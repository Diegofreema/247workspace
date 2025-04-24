import Image from 'next/image';

type Props = {
  isPurple?: boolean;
  className?: string;
};

export const Logo = ({ isPurple = false, className }: Props) => {
  return (
    <Image
      src={'/l.png'}
      width={250}
      height={100}
      alt={'logo'}
      className={className}
    />
  );
};
