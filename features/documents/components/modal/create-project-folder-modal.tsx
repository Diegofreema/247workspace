'use client';

import { Button } from '@/components/custom/custom-button';
import { FlexBox } from '@/components/custom/flex-box';
import { colors } from '@/constants';

import { CloseButton, Dialog, IconButton, Portal } from '@chakra-ui/react';

import { FormInput } from '@/components/form/form-input';
import { useProjectId } from '@/hooks/useProjectId';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateProjectFolder } from '../../api/use-create-project-folder';
import { useProjectFolderModalController } from '../../hooks/use-folder-modal-controller';
import { createProjectFolderSchema } from '../../schema';

export const CreateProjectFolder = () => {
  const { isOpen, close } = useProjectFolderModalController();
  const { mutateAsync } = useCreateProjectFolder();
  const projectId = useProjectId();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<z.infer<typeof createProjectFolderSchema>>({
    defaultValues: {
      name: '',
      projectId,
    },
    resolver: zodResolver(createProjectFolderSchema),
  });

  useEffect(() => {
    if (!projectId) return;
    setValue('projectId', projectId);
  }, [projectId, setValue]);

  const onSubmit = async (data: z.infer<typeof createProjectFolderSchema>) => {
    await mutateAsync(
      {
        json: data,
      },
      {
        onSuccess: () => {
          close();
          reset();
        },
      }
    );
  };
  return (
    <Dialog.Root
      placement="center"
      motionPreset={'slide-in-bottom'}
      open={isOpen}
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
                  Choose a folder name
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
                disabled={isSubmitting}
                loading={isSubmitting}
                width={'fit-content'}
              >
                Create
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
