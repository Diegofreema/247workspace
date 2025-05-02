import { CreateButton } from '@/components/buttons/create-button';
import { FlexBox } from '@/components/custom/flex-box';
import { SearchInput } from '@/components/navigation/search-input';
import {
  useFolderModalController,
  useProjectFolderModalController,
} from '../hooks/use-folder-modal-controller';
import {
  useSearchFolder,
  useSearchProjectFolder,
} from '../hooks/use-search-folder';

type Props = {
  onOpen: () => void;
};

export const FolderActions = () => {
  const { query, setQuery, clearQuery } = useSearchFolder();
  const { open } = useFolderModalController();
  return (
    <FlexBox justifyContent={'space-between'}>
      <SearchInput
        value={query || ''}
        setValue={setQuery}
        clearValue={clearQuery}
        placeholder="Search by folder name"
      />
      <CreateButton onClick={open} text="Create folder" width="fit" />
    </FlexBox>
  );
};

export const ProjectFolderActions = () => {
  const { query, setQuery, clearQuery } = useSearchProjectFolder();
  const { open } = useProjectFolderModalController();
  return (
    <FlexBox justifyContent={'space-between'}>
      <SearchInput
        value={query || ''}
        setValue={setQuery}
        clearValue={clearQuery}
        placeholder="Search by folder name"
      />
      <CreateButton onClick={open} text="Create folder" width="fit" />
    </FlexBox>
  );
};
