import { colors } from '@/constants';
import { MemberRole, MemberWithProfile } from '@/types';
import { Table } from '@chakra-ui/react';
import { useDeleteMember } from '../api/use-delete-member';
import { useUpdateMemberRole } from '../api/use-update-member';
import { MemberMenu } from './member-menu';
import { CustomAvatar } from '@/components/custom/cutom-avatar';
import { useEffect } from 'react';
import { toaster } from '@/components/ui/toaster';

type Props = {
  members: MemberWithProfile[];
  userId: string;
};
export const MemberTable = ({ members, userId }: Props) => {
  const { mutateAsync: updateMemberRole, isPending: isPendingMemberRole } =
    useUpdateMemberRole();
  const { mutateAsync: deleteMember, isPending: isPendingDeleteMember } =
    useDeleteMember();
  const handleUpdateMemberRole = async (memberId: string, role: MemberRole) => {
    await updateMemberRole({ json: { role }, param: { memberId } }, {});
  };

  const handleDeleteMember = async (memberId: string) => {
    await deleteMember({ param: { memberId } });
  };
  const disabled = isPendingDeleteMember || isPendingMemberRole;
  const chiefAdmin = members.find(
    (item) => item?.memberRole === 'CHIEF_ADMIN'
  )!;
  const admin = members.filter((item) => item?.memberRole === 'ADMIN');
  const isChiefAdminId = chiefAdmin?.userId === userId;
  const isAdmin = admin?.find((item) => item?.userId === userId);
  const showAction = isChiefAdminId || !!isAdmin;
  const isLoading = isPendingDeleteMember || isPendingMemberRole;
  return (
    <Table.Root
      size="sm"
      bg={'transparent'}
      mt={5}
      variant={'outline'}
      borderWidth={0}
      borderColor={'transparent'}
    >
      <Table.Header bg={colors.milk}>
        <Table.Row>
          {header.map((item, i) => {
            const isLast = i === header.length - 1;
            return (
              <Table.ColumnHeader
                key={item}
                color={colors.black}
                fontWeight={'bold'}
                textAlign={isLast ? 'end' : 'start'}
              >
                {item}
              </Table.ColumnHeader>
            );
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {members?.map((item) => (
          <Table.Row key={item.$id}>
            <Table.Cell
              textAlign={'start'}
              alignItems={'center'}
              display={'flex'}
              gap={1}
            >
              <CustomAvatar
                name={item?.name?.charAt(0)?.toUpperCase()}
                src={item?.avatarUrl}
              />
              {item?.name}
            </Table.Cell>
            <Table.Cell textAlign={'start'}>{item?.email}</Table.Cell>
            <Table.Cell textAlign="start">{item?.role}</Table.Cell>
            <Table.Cell textAlign="start">
              {item?.memberRole?.replace('_', ' ')}
            </Table.Cell>
            {item.memberRole !== MemberRole.CHIEF_ADMIN && (
              <Table.Cell textAlign="end" className="group">
                <MemberMenu
                  name={item?.name?.split(' ')[0]}
                  handleUpdateMemberRole={handleUpdateMemberRole}
                  handleDeleteMember={handleDeleteMember}
                  disabled={disabled}
                  memberId={item?.$id}
                  isChiefAdminId={chiefAdmin?.userId}
                  userId={userId}
                  memberRole={item?.memberRole}
                  showAction={showAction}
                  isLoading={isLoading}
                />
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
const header = ['Member name', 'Email', 'Role', 'Access', 'Action'];

const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Coffee Maker', category: 'Home Appliances', price: 49.99 },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
  { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 },
];
