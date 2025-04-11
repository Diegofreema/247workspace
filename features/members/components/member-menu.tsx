import { colors } from '@/constants';
import { MemberRole } from '@/types';
import { IconButton, Menu, Portal, Spinner } from '@chakra-ui/react';
import { IconDotsVertical, IconLoader2 } from '@tabler/icons-react';
import React from 'react';
import { Rings } from 'react-loader-spinner';

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
  isLoading: boolean;
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
  isLoading,
}: Props) => {
  const isAdmin = memberRole === MemberRole.ADMIN;
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          border={'1px solid #ccc'}
          className="group-hover:opacity-50 transition"
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <Rings
              visible={true}
              height="80"
              width="80"
              color={colors.iconGrey}
              ariaLabel="rings-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <IconDotsVertical color={colors.black} />
          )}
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content bg={colors.white} color={colors.black}>
            {showAction && (
              <>
                {isAdmin ? (
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
                ) : (
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
                )}
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
