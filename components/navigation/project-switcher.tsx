import { colors } from '@/constants';
import { Box, Stack } from '@chakra-ui/react';
import { IconPlus } from '@tabler/icons-react';
import { FlexBox } from '../custom/flex-box';
import { CustomText } from '../custom/title';
import { CreateProject } from '../buttons/create-project';

export const ProjectSwitcher = () => {
  return (
    <Box mb={10} borderBottom={'1px solid #ccc'} pb={10}>
      <FlexBox justifyContent={'space-between'} alignItems={'center'} px={4}>
        <CustomText
          color={colors.grey}
          fontWeight={'bold'}
          fontSize={{ base: 'xl', md: '2xl' }}
        >
          Projects
        </CustomText>
        <CreateProject
          width={'fit'}
          icon={<IconPlus size={25} color={colors.iconGrey} />}
          bg="transparent"
        />
      </FlexBox>
      <Stack mt={5}>
        <CustomText color={'#ccc'} textAlign={'center'} fontWeight={'bold'}>
          No projects yet
        </CustomText>
      </Stack>
    </Box>
  );
};
