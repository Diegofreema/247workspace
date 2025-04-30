import { CreateButton } from '@/components/buttons/create-button';
import { FlexBox } from '@/components/custom/flex-box';
import { SearchInput } from '@/components/navigation/search-input';
import React from 'react';
import { useFolderModalController } from '../hooks/use-folder-modal-controller';
import { useSearchFolder } from '../hooks/use-search-folder';

type Props = {};

export const FolderActions = ({}: Props) => {
  const { open } = useFolderModalController();
  const { query, setQuery, clearQuery } = useSearchFolder();
  return (
    <FlexBox justifyContent={'space-between'}>
      <SearchInput
        value={query || ''}
        setValue={setQuery}
        clearValue={clearQuery}
      />
      <CreateButton onClick={open} text="Create folder" width="fit" />
    </FlexBox>
  );
};
