'use client';

import { colors } from '@/constants';

import {
  Box,
  CloseButton,
  Dialog,
  Field,
  FileUpload,
  FileUploadFileRejectDetails,
  Icon,
  IconButton,
  Portal,
  Stack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCurrentUser } from '@/features/auth/api/use-current-user';
import { createProjectDocumentSchema } from '@/features/documents/schema';
import { Controller, useForm } from 'react-hook-form';
import { LuUpload } from 'react-icons/lu';
import { z } from 'zod';

import { Button } from '@/components/custom/custom-button';
import { FlexBox } from '@/components/custom/flex-box';
import { FormInput } from '@/components/form/form-input';
import { ReusableSkeleton } from '@/components/skeletons/link-skeleton';
import { useProjectId } from '@/hooks/useProjectId';
import { useEffect } from 'react';
import { useUploadWorkspaceDocument } from '../../api/use-create-workspace-document';
import { useCreateProjectDocumentModalController } from '../../hooks/use-create-workspace-document';
import { useUploadProjectDocument } from '../../api/use-create-project-document';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';

export const CreateProjectDocumentModal = () => {
  const { folderId, close } = useCreateProjectDocumentModalController();

  const { data, isPending, isError } = useCurrentUser();
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();

  const { mutateAsync } = useUploadProjectDocument();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    control,

    setValue,
  } = useForm<z.infer<typeof createProjectDocumentSchema>>({
    defaultValues: {
      name: '',
      documentUrl: '',
      projectId,
      folderId: folderId as string,
      uploadedBy: data?.profile?.name,
    },
    resolver: zodResolver(createProjectDocumentSchema),
  });

  useEffect(() => {
    if (data?.profile?.name && projectId && folderId) {
      setValue('uploadedBy', data?.profile?.name as string);
      setValue('projectId', projectId);
      setValue('workspaceId', workspaceId);
      setValue('folderId', folderId);
    }
  }, [data?.profile?.name, setValue, projectId, folderId, workspaceId]);

  const onSubmit = async (
    data: z.infer<typeof createProjectDocumentSchema>
  ) => {
    const finalValues = {
      ...data,
      documentUrl: data.documentUrl instanceof File ? data.documentUrl : '',
      projectId,
    };
    await mutateAsync({ form: finalValues });
    reset();
    close();
  };
  const onCancel = () => {
    reset();
    close();
  };
  if (isError) {
    close();
    throw new Error('Error fetching current user');
  }
  if (isPending) {
    return (
      <Stack gap={5}>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <ReusableSkeleton key={i} />
          ))}
      </Stack>
    );
  }
  const onFileReject = (details: FileUploadFileRejectDetails) => {
    console.log(details);
  };

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
                  Upload document
                </Dialog.Title>
                <IconButton onClick={onCancel} borderRadius={72}>
                  <CloseButton bg={colors.white} color={colors.black} />
                </IconButton>
              </FlexBox>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap={5}>
                <FormInput
                  register={register}
                  name="name"
                  label="File name"
                  errors={errors}
                  placeholder="247lab..."
                  required
                  disabled={isSubmitting}
                />
                <Controller
                  name="documentUrl"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Field.Root
                      invalid={!!errors['documentUrl']}
                      width="100%"
                      required
                    >
                      <FileUpload.Root
                        maxW="xl"
                        alignItems="stretch"
                        maxFiles={1}
                        maxFileSize={5242880}
                        accept={['application/pdf']}
                        onFileAccept={(files) => {
                          console.log(files.files[0].type);

                          onChange(files.files[0]);
                        }}
                        onFileReject={onFileReject}
                      >
                        <FileUpload.HiddenInput />
                        <FileUpload.Dropzone>
                          <Icon size="md" color="fg.muted">
                            <LuUpload />
                          </Icon>
                          <FileUpload.DropzoneContent>
                            <Box>Drag and drop files here</Box>
                            <Box color="fg.muted">.pdf up to 5MB</Box>
                          </FileUpload.DropzoneContent>
                        </FileUpload.Dropzone>
                        <FileUpload.List clearable showSize />
                        <Field.ErrorText>
                          {errors['documentUrl']?.message as string}
                        </Field.ErrorText>
                      </FileUpload.Root>
                    </Field.Root>
                  )}
                />
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  width={'fit-content'}
                  disabled={isSubmitting}
                  color={colors.black}
                  onClick={onCancel}
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
                Upload
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
