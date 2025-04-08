import { CustomSelect } from '@/components/custom/custom-select';
import { FlexBox } from '@/components/custom/flex-box';
import { CustomText, Title } from '@/components/custom/title';
import { SearchInput } from '@/components/navigation/search-input';
import { colors } from '@/constants';
import {
  Box,
  createListCollection,
  SelectValueChangeDetails,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';

type Props = {};

export const Member = () => {
  const [value, setValue] = useState(['CHIEF_ADMIN']);
  const onChange = (
    data: SelectValueChangeDetails<{ label: string; value: string }>
  ) => {
    setValue(data.value);
  };
  console.log(value);

  return (
    <Box>
      <Stack>
        <Title fontSize={25}>Team Members</Title>
        <CustomText color={colors.grey}>
          Manage all your team members here
        </CustomText>
      </Stack>
      <FlexBox alignItems={'center'} justifyContent={'space-between'}>
        <SearchInput />
        <CustomSelect data={data} value={value} onChange={onChange} />
      </FlexBox>
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
