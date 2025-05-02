'use client';

import { Button } from '@/components/custom/custom-button';
import { FlexBox } from '@/components/custom/flex-box';
import { colors } from '@/constants';

import { CloseButton, Dialog, IconButton, Portal } from '@chakra-ui/react';

import { FormInput } from '@/components/form/form-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEditProjectFolder } from '../../api/use-edit-project-folder';
import { useEditProjectFolderModalController } from '../../hooks/use-edit-folder-controller';
import { editFolderSchema } from '../../schema';
import { useEditProjectFolderStore } from '../../store/edit-workspace-folder-store';

export const EditProjectFolderModal = () => {
  const { folderId, close } = useEditProjectFolderModalController();
  const previousFolderName = useEditProjectFolderStore((state) => state.name);
  const { mutateAsync } = useEditProjectFolder();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
  } = useForm<z.infer<typeof editFolderSchema>>({
    defaultValues: {
      name: previousFolderName,
    },
    resolver: zodResolver(editFolderSchema),
  });

  useEffect(() => {
    if (previousFolderName) {
      setValue('name', previousFolderName);
    }
  }, [previousFolderName, setValue]);

  console.log({ folderId });

  const onSubmit = async (data: z.infer<typeof editFolderSchema>) => {
    if (!folderId) return;
    await mutateAsync(
      {
        json: data,
        param: {
          folderId,
        },
      },
      {
        onSuccess: () => {
          close();
          reset();
        },
      }
    );
  };
  const { name } = watch();
  const disabled = name === previousFolderName;
  return (
    <Dialog.Root
      placement="center"
      motionPreset={'slide-in-bottom'}
      open={!!folderId}
      onOpenChange={close}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg={colors.white}>
            <Dialog.Header>
              <FlexBox
                justifyContent={'space-between'}
                width="100%"
                alignItems={'center'}
              >
                <Dialog.Title color={colors.black} fontSize={30}>
                  Edit folder name
                </Dialog.Title>
                <IconButton onClick={close}>
                  <CloseButton bg={colors.white} color={colors.black} />
                </IconButton>
              </FlexBox>
            </Dialog.Header>
            <Dialog.Body>
              <FormInput
                label="Folder Name"
                placeholder="Folder Name"
                name="name"
                required
                errors={errors}
                register={register}
              />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  width={'fit-content'}
                  color={colors.black}
                  onClick={close}
                >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                bg={colors.purple}
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting || disabled}
                loading={isSubmitting}
                width={'fit-content'}
                loadingText="Updating..."
              >
                Update
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
