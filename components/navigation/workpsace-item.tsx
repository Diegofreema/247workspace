import { SizeType } from '@/types';
import { FlexBox } from '../custom/flex-box';
import { CustomText } from '../custom/title';
import { WorkspaceAvatar } from '../ui/workspace-avatar';

type AvatarProps = {
  name: string;
  image?: string;
  size?: SizeType;
};

export const AvatarItem = ({ name, image, size = 'md' }: AvatarProps) => {
  return (
    <FlexBox alignItems={'center'} gap={3}>
      <WorkspaceAvatar name={name} image={image} size={size} />
      <CustomText className="truncate text-black text-xs font-bold group-hover:text-white">
        {name}
      </CustomText>
    </FlexBox>
  );
};
