import { CustomSelect } from '@/components/custom/custom-select';
import { FlexBox } from '@/components/custom/flex-box';
import { CustomText, Title } from '@/components/custom/title';
import { SearchInput } from '@/components/navigation/search-input';
import { colors } from '@/constants';
import { MemberWithProfile } from '@/types';
import {
  Box,
  createListCollection,
  IconButton,
  SelectValueChangeDetails,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MemberTable } from './member-table';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

type Props = {
  members: MemberWithProfile[];
  userId: string;
};

export const Member = ({ members, userId }: Props) => {
  const [value, setValue] = useState(['CHIEF_ADMIN']);
  const [search, setSearch] = useState('');
  const onClear = () => {
    setSearch('');
  };
  const onChange = (
    data: SelectValueChangeDetails<{ label: string; value: string }>
  ) => {
    setValue(data.value);
  };

  const filteredMembers = members.filter((member) => {
    if (!search) return member;
    return member.name?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Box>
      <Stack>
        <Title fontSize={25}>Team Members</Title>
        <CustomText color={colors.grey}>
          Manage all your team members here
        </CustomText>
      </Stack>
      <FlexBox alignItems={'center'} justifyContent={'space-between'}>
        <FlexBox
          borderWidth={1}
          borderColor={'#ccc'}
          borderRadius={5}
          className="w-full max-w-screen-sm"
        >
          <Input
            placeholder={'Search members'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border-0 outline-0"
          />
          {search && (
            <IconButton onClick={() => setSearch('')}>
              <X />
            </IconButton>
          )}
        </FlexBox>
        <CustomSelect data={data} value={value} onChange={onChange} />
      </FlexBox>

      <MemberTable members={filteredMembers} userId={userId} />
    </Box>
  );
};

const data = createListCollection({
  items: [
    { label: 'Chief Admin', value: 'CHIEF_ADMIN' },
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Member', value: 'MEMBER' },
  ],
});
