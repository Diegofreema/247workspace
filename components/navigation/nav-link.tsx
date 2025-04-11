'use client';
import {
  IconBriefcase2,
  IconFolders,
  IconLayout2,
  IconSettings,
  IconSortAscending2,
  IconUsers,
} from '@tabler/icons-react';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

import { colors } from '@/constants';
import { routes } from '@/utils/routes';

import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { FlexBox } from '../custom/flex-box';
import { CustomText } from '../custom/title';
import { ReusableSkeleton } from '../skeletons/link-skeleton';

type Props = {
  item: (typeof routes)[0];
};

const icons = {
  IconBriefcase2,
  IconLayout2,
  IconSortAscending2,
  IconUsers,
  IconFolders,
  IconSettings,
};
export const NavLink = ({ item }: Props) => {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  const { icon, label, path } = item;
  const isActive = pathname.includes(label.toLowerCase());
  const defaultRoute =
    label.toLowerCase() === 'settings' ? '/workspace' : '/workspaces';
  const route = `${defaultRoute}/${workspaceId}/${path}`;
  const IconToRender = icons[icon as keyof typeof icons];
  const bgColor = isActive ? colors.purple : 'transparent';
  const color = isActive ? colors.white : colors.iconGrey;

  const fill = isActive ? 'white' : 'transparent';
  const showSkeleton = !workspaceId;
  if (showSkeleton) {
    return <ReusableSkeleton />;
  }
  return (
    <Link href={route} className="w-full">
      <FlexBox
        gap={3}
        alignItems={'center'}
        p={3}
        borderRadius={5}
        bg={bgColor}
        className="hover:bg-purple group transition w-full"
      >
        <IconToRender
          className={` size-3 sm:size-5 group-hover:text-white transition ${isActive ? 'text-white' : 'text-iconGrey'}`}
          fill={fill}
        />
        <CustomText
          color={color}
          className="group-hover:text-white transition font-semibold text-[12px] sm:text-[15px]"
        >
          {label}
        </CustomText>
      </FlexBox>
    </Link>
  );
};
