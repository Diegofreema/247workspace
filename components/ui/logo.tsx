import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';

type Props = {
  isPurple?: boolean;
  className?: string;
};

export const Logo = ({ isPurple = false, className }: Props) => {
  return (
    <Link href="/">
      <Image
        src={'/l.png'}
        width={250}
        height={100}
        alt={'logo'}
        className={cn('object-contain', className)}
      />
    </Link>
  );
};
