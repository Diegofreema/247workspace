'use client';
import {
  IconBriefcase2,
  IconFolders,
  IconLayout2,
  IconSettings,
  IconSortAscending2,
  IconUsers,
} from '@tabler/icons-react';
import { useTransitionRouter } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

import { colors } from '@/constants';
import { routes } from '@/utils/routes';

import { drawerStore$ } from '@/lib/legend/drawer-store';
import { FlexBox } from '../custom/flex-box';
import { CustomText } from '../custom/title';

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
export const NavLinkButtons = ({ item }: Props) => {
  const pathname = usePathname();
  const router = useTransitionRouter();
  const { icon, label, path } = item;
  const isActive = pathname === path;

  const IconToRender = icons[icon as keyof typeof icons];
  const bgColor = isActive ? colors.purple : 'transparent';
  const color = isActive ? colors.white : colors.iconGrey;

  const fill = isActive ? 'white' : 'transparent';

  const onClick = () => {
    if (pathname === path) return;
    router.push(path);
    drawerStore$.setOpen(false);
  };
  return (
    <FlexBox
      onClick={onClick}
      gap={3}
      alignItems={'center'}
      justifyContent={'center'}
      p={3}
      borderRadius={5}
      bg={bgColor}
      className="hover:bg-purple group transition w-full"
    >
      <IconToRender
        size={30}
        className={`group-hover:text-white transition ${isActive ? 'text-white' : 'text-iconGrey'}`}
        fill={fill}
      />
      <CustomText
        color={color}
        className="group-hover:text-white transition font-semibold"
      >
        {label}
      </CustomText>
    </FlexBox>
  );
};
