import { FlexBox } from '../custom/flex-box';
import { CustomText } from '../custom/title';
import { WorkspaceAvatar } from '../ui/workspace-avatar';

type Props = {
  name: string;
  image?: string;
};

export const AvatarItem = ({ name, image }: Props) => {
  return (
    <FlexBox alignItems={'center'} gap={3}>
      <WorkspaceAvatar name={name} image={image} />
      <CustomText className="truncate text-black text-xs font-bold group-hover:text-white">
        {name}
      </CustomText>
    </FlexBox>
  );
};
