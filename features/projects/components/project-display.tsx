import { FlexBox } from '@/components/custom/flex-box';
import { Project } from '@/types';
import React from 'react';
import { ProjectInnerItem } from './project-item';
import { Link } from 'next-view-transitions';
import { IconPencil } from '@tabler/icons-react';

type Props = {
  project: Project;
};

export const ProjectDisplay = ({ project }: Props) => {
  const link = `/workspace/${project.workspaceId}/project/settings/${project.$id}`;
  return (
    <div className="min-h-screen bg-white p-5">
      <FlexBox alignItems={'center'} justifyContent={'space-between'}>
        <ProjectInnerItem
          name={project.name}
          image={project.imageUrl}
          size="sm"
        />
        <Link href={link}>
          <FlexBox
            alignItems={'center'}
            p={2}
            className="bg-purple p-3 rounded-sm hover:opacity-50 transition text-white flex items-center gap-2"
            borderRadius={'sm'}
          >
            <IconPencil size={24} color="white" />
            Edit
          </FlexBox>
        </Link>
      </FlexBox>
    </div>
  );
};
