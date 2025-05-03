import { FlexBox } from '@/components/custom/flex-box';
import { CustomText, Title } from '@/components/custom/title';
import { ShadCnSelect } from '@/components/form/ShandCnSelect';
import { colors } from '@/constants';
import { MemberWithProfile } from '@/types';
import { Box, Stack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { MemberTable } from './member-table';
import { SearchInput } from '@/components/navigation/search-input';

type Props = {
  members: MemberWithProfile[];
  userId: string;
};

export const Member = ({ members, userId }: Props) => {
  const [value, setValue] = useState<VARIANTS | string>('ALL');
  const [search, setSearch] = useState('');
  const onChange = (value: string) => {
    setValue(value);
  };

  const onClear = () => {
    setSearch('');
  };

  const filteredBySelect = useMemo(() => {
    if (value === 'ALL') {
      return members;
    } else {
      return members.filter((member) => member.memberRole === value);
    }
  }, [value, members]);

  const filteredMembers = useMemo(() => {
    if (!search) return filteredBySelect;
    return filteredBySelect.filter((member) => {
      const searchValue = search.toLowerCase();

      return (
        member?.name?.toLowerCase().includes(searchValue) ||
        member?.email.toLowerCase().includes(searchValue)
      );
    });
  }, [filteredBySelect, search]);
  return (
    <Box className="overflow-auto">
      <Stack>
        <Title fontSize={25}>Team Members</Title>
        <CustomText color={colors.grey}>
          Manage all your team members here
        </CustomText>
      </Stack>
      <FlexBox alignItems={'center'} justifyContent={'space-between'} mt={5}>
        <SearchInput
          value={search}
          setValue={setSearch}
          clearValue={onClear}
          placeholder="Search by name , email"
        />
        <div className="max-w-[300px] w-[200px]">
          <ShadCnSelect
            data={data}
            value={value}
            onValueChange={onChange}
            placeholder="Select a role"
            disabled={false}
          />
        </div>
      </FlexBox>

      <MemberTable members={filteredMembers} userId={userId} />
    </Box>
  );
};

const data = [
  { label: 'All', value: 'ALL' },
  { label: 'Chief Admin', value: 'CHIEF_ADMIN' },
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Member', value: 'MEMBER' },
];

type VARIANTS = 'CHIEF_ADMIN' | 'ADMIN' | 'MEMBER' | 'ALL';
