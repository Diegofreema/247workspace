'use client';

import { colors } from '@/constants';
import { Button, Menu, Portal } from '@chakra-ui/react';
import { LogoutBtn } from '../buttons/logout-button';
import { CustomText } from '../custom/title';

type Props = {
  name: string;
  email: string;
};
export const AvatarMenu = ({ name, email }: Props) => {
  const firstLetter = name?.charAt(0)?.toUpperCase();
  const secondLetter = name?.split(' ')[1]?.charAt(0)?.toUpperCase() ?? '';
  const prefix = `${firstLetter}${secondLetter}`;

  return (
    <Menu.Root>
      <Menu.Trigger asChild mr={2}>
        <Button
          variant="outline"
          size="md"
          borderRadius={1000}
          bg={colors.purple}
        >
          {prefix}
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
              {prefix}
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
