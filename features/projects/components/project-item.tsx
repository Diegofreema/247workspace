import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { WorkspaceAvatar } from '@/components/ui/workspace-avatar';
import { cn } from '@/lib/utils';
import { SizeType } from '@/types';
import { Link } from 'next-view-transitions';
import React from 'react';

type Props = {
  name: string;
  image?: string;
  size?: SizeType;
  href: string;
  isActive: boolean;
};

type ProjectItemProps = Omit<Props, 'href' | 'isActive'> & {
  className?: string;
};

export const ProjectItem = ({
  name,
  image,
  size = 'md',
  isActive,
  href,
}: Props) => {
  return (
    <Link href={href}>
      <FlexBox
        alignItems={'center'}
        gap={3}
        p={2}
        ml={5}
        className={cn(
          'group hover:bg-purple transition bg-green-400 duration-300 ease-in-out p-2',
          isActive ? 'bg-purple text-white' : 'bg-transparent text-black'
        )}
      >
        <WorkspaceAvatar name={name} image={image} size={size} />
        <CustomText
          className={cn(
            'truncate text-xs font-bold group-hover:text-white',
            isActive ? 'text-white' : 'text-black'
          )}
        >
          {name}
        </CustomText>
      </FlexBox>
    </Link>
  );
};

export const ProjectInnerItem = ({
  name,
  image,
  size,
  className,
}: ProjectItemProps) => {
  return (
    <FlexBox
      alignItems={'center'}
      gap={3}
      p={2}
      className={cn(' duration-300 ease-in-out p-2')}
    >
      <WorkspaceAvatar name={name} image={image} size={size} />
      <CustomText
        className={cn(
          'truncate text-xs font-bold group-hover:text-white',
          className
        )}
      >
        {name}
      </CustomText>
    </FlexBox>
  );
};
