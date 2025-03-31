import { routes } from '@/utils/routes';
import { Link } from 'next-view-transitions';
import React from 'react';
import { FlexBox } from '../custom/flex-box';
import { CustomText } from '../custom/title';
import { usePathname } from 'next/navigation';
import { colors } from '@/constants';

type Props = {
  item: (typeof routes)[0];
};

export const NavLink = ({ item }: Props) => {
  const pathname = '';
  const { activeIcon: ActiveIcon, icon: Icon, label, path } = item;
  const isActive = pathname === path;
  const IconToRender = isActive ? ActiveIcon : Icon;
  const bgColor = isActive ? colors.purple : 'transparent';
  const color = isActive ? colors.white : colors.iconGrey;
  const iconSize = isActive ? 30 : 25;

  return (
    <Link href={path} className="w-full">
      <FlexBox
        gap={3}
        alignItems={'center'}
        justifyContent={'center'}
        p={3}
        borderRadius={5}
        bg={bgColor}
        className="hover:bg-purple group transition w-full"
      >
        <IconToRender
          size={iconSize}
          className={`group-hover:text-white transition ${isActive ? 'text-iconGrey' : 'text-white'}`}
        />
        <CustomText
          color={color}
          className="group-hover:text-white transition font-semibold"
        >
          {label}
        </CustomText>
      </FlexBox>
    </Link>
  );
};
