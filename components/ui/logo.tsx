'use client';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';

type Props = {
  isPurple?: boolean;
  className?: string;
};

export const Logo = ({ isPurple = false, className }: Props) => {
  const workspaceId = useWorkspaceId();

  const link = `/workspaces/${workspaceId}/home`;
  return (
    <Link href={link} className={cn('', className)}>
      <Image
        src={'/l.png'}
        width={250}
        height={100}
        alt={'logo'}
        className={'object-contain'}
      />
    </Link>
  );
};
