import { CustomText } from '@/components/custom/title';
import { Heading } from '@/components/ui/heading';
import { colors } from '@/constants';
import { ProjectFolderType } from '@/types';
import { ProjectFolderActions } from './folder-actions';
import { ProjectFolders } from './project-folder';

type Props = {
  folders: ProjectFolderType[];
  total: number;
};

export const ProjectFolderDisplay = ({ folders, total }: Props) => {
  return (
    <div>
      <Heading title="Folders" subTitle="View your folders here" />
      <ProjectFolderActions />
      {total === 0 && (
        <CustomText
          color={colors.black}
          fontWeight={'bold'}
          textAlign={'center'}
          mt={10}
        >
          No folders yet
        </CustomText>
      )}
      <ProjectFolders folders={folders} total={total} />
    </div>
  );
};
