'use client';

import { colors } from '@/constants';
import { Button, Menu, Portal } from '@chakra-ui/react';
import { LogoutBtn } from '../buttons/logout-button';
import { CustomText } from '../custom/title';
import { AvatarItem } from './workpsace-item';
import { ProfileAvatar } from '../ui/profile-avatar';

type Props = {
  name: string;
  email: string;
  imageUrl?: string;
};
export const AvatarMenu = ({ name, email, imageUrl }: Props) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild mr={2}>
        <Button
          variant="outline"
          size="md"
          borderRadius={1000}
          bg={colors.purple}
          color={colors.white}
        >
          <ProfileAvatar name={name} imageUrl={imageUrl} />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content
            bg="white"
            py={5}
            px={6}
            gap={2}
            display={'flex'}
            flexDir={'column'}
            alignItems={'center'}
          >
            <Button
              variant="outline"
              size="2xl"
              borderRadius={1000}
              bg={colors.purple}
              alignSelf={'center'}
            >
              <ProfileAvatar name={name} imageUrl={imageUrl} />
            </Button>
            <CustomText
              fontWeight={'bold'}
              fontSize={'20px'}
              color={colors.black}
              textAlign={'center'}
            >
              {name}
            </CustomText>
            <CustomText color={colors.grey}>{email}</CustomText>

            <LogoutBtn />
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
