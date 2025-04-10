import { colors } from '@/constants';
import { MemberRole } from '@/types';
import { IconButton, Menu, Portal } from '@chakra-ui/react';
import { IconDotsVertical } from '@tabler/icons-react';
import React from 'react';

type Props = {
  name: string;
  handleUpdateMemberRole: (memberId: string, role: MemberRole) => void;
  handleDeleteMember: (memberId: string) => void;
  disabled: boolean;
  memberId: string;
  isChiefAdminId: string;
  userId: string;
  memberRole: MemberRole;
  showAction: boolean;
};

export const MemberMenu = ({
  name,
  handleUpdateMemberRole,
  disabled,
  handleDeleteMember,
  memberId,
  isChiefAdminId,
  userId,
  memberRole,
  showAction,
}: Props) => {
  const isChiefAdmin = memberRole === MemberRole.CHIEF_ADMIN;
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          border={'1px solid #ccc'}
          className="group-hover:opacity-50 transition"
        >
          <IconDotsVertical color={colors.black} />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content bg={colors.white} color={colors.black}>
            {showAction && (
              <>
                <Menu.Item
                  value="set-admin"
                  fontWeight={'bold'}
                  color={colors.black}
                  disabled={disabled}
                  onClick={() =>
                    handleUpdateMemberRole(memberId, MemberRole.ADMIN)
                  }
                >
                  Set as Admin
                </Menu.Item>
                <Menu.Item
                  value="set-member"
                  fontWeight={'bold'}
                  color={colors.black}
                  disabled={disabled}
                  onClick={() =>
                    handleUpdateMemberRole(memberId, MemberRole.MEMBER)
                  }
                >
                  Set as Member
                </Menu.Item>
              </>
            )}

            <Menu.Item
              value="remove-member"
              fontWeight={'bold'}
              color={colors.red}
              disabled={disabled}
              onClick={() => handleDeleteMember(memberId)}
            >
              {showAction ? `Remove ${name}` : 'Leave workspace'}
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
