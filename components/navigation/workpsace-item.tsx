import React from 'react';
import { FlexBox } from '../custom/flex-box';
import { WorkspaceAvatar } from '../ui/workspace-avatar';
import { Link } from 'next-view-transitions';
import { CustomText } from '../custom/title';
import { useParams } from 'next/navigation';

type Props = {
  name: string;
  image?: string;
  id: string;
};

export const WorkspaceItem = ({ name, image, id }: Props) => {
  const { projectId } = useParams();
  const isActive = projectId === id; // Check if the project is the active one

  return (
    <Link
      href={`/projects/${id}`}
      className={`w-full hover:translate-x-2 transition  p-1 duration-300 ${isActive ? 'translate-x-2' : 'translate-x-0'}`}
    >
      <FlexBox alignItems={'center'} gap={3}>
        <WorkspaceAvatar name={name} image={image} />
        <CustomText className="truncate text-black text-xs font-bold ">
          {name}
        </CustomText>
      </FlexBox>
    </Link>
  );
};
