'use client';

import { colors } from '@/constants';

import { createWorkspaceSchema } from '@/features/workspaces/schema';
import { createWorkspaceModal$ } from '@/lib/legend/create-workspace-store';
import { CloseButton, Dialog, Image, Portal, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { use$ } from '@legendapp/state/react';
import { IconPhotoCirclePlus } from '@tabler/icons-react';

import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../custom/custom-button';
import { FormInput } from '../form/form-input';
import { useCreateWorkspace } from '@/features/workspaces/api/use-create-workspace';

export const CreateWorkspaceModal = () => {
  const isOpen = use$(createWorkspaceModal$.isOpen);
  const { mutateAsync } = useCreateWorkspace();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    control,
  } = useForm<z.infer<typeof createWorkspaceSchema>>({
    defaultValues: {
      name: '',
      image: '',
    },
    resolver: zodResolver(createWorkspaceSchema),
  });

  const onSubmit = async (data: z.infer<typeof createWorkspaceSchema>) => {
    const finalValues = {
      ...data,
      image: data.image instanceof File ? data.image : '',
    };
    await mutateAsync({ form: finalValues });
    reset();
    createWorkspaceModal$.setOpen(false);
  };
  const onCancel = () => {
    reset();
    createWorkspaceModal$.setOpen(false);
  };
  return (
    <Dialog.Root
      placement="center"
      motionPreset={'slide-in-bottom'}
      open={isOpen}
      onOpenChange={(e) => createWorkspaceModal$.setOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg={colors.white}>
            <Dialog.Header>
              <Dialog.Title color={colors.black} fontSize={30}>
                Create a workspace
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap={5}>
                <FormInput
                  register={register}
                  name="name"
                  label="Project name"
                  errors={errors}
                  placeholder="My project"
                  required
                  disabled={isSubmitting}
                />
                <Controller
                  name="image"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="flex flex-col gap-y">
                      <div className="flex items-center gap-x-5">
                        {value ? (
                          <Image
                            objectFit={'cover'}
                            width={'72px'}
                            height={'72px'}
                            borderRadius={72}
                            alt="logo"
                            src={
                              value instanceof File
                                ? URL.createObjectURL(value)
                                : value
                            }
                            className=" object-cover"
                          />
                        ) : (
                          <IconPhotoCirclePlus
                            className="size-[72px]"
                            color={colors.purple}
                          />
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm text-black">Workspace icon</p>
                          <p className="text-sm text-[#ccc]">
                            JPG, PNG, JPEG, SVG, up to 1MB
                          </p>
                          <input
                            ref={inputRef}
                            type="file"
                            className="hidden"
                            accept=".jpg, .png, .jpeg, .svg"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                onChange(file);
                              }
                            }}
                            disabled={isSubmitting}
                          />
                          {value ? (
                            <Button
                              color={'red'}
                              borderColor={'red'}
                              borderWidth={1}
                              variant={'solid'}
                              size={'xs'}
                              onClick={() => {
                                onChange(null);
                                if (inputRef.current) {
                                  inputRef.current.value = '';
                                }
                              }}
                              width={'fit-content'}
                              mt={2}
                            >
                              Remove image
                            </Button>
                          ) : (
                            <Button
                              color={colors.purple}
                              borderColor={colors.purple}
                              borderWidth={1}
                              variant={'solid'}
                              size={'xs'}
                              onClick={() => inputRef?.current?.click()}
                              width={'fit-content'}
                              mt={2}
                            >
                              Upload image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
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
                Create
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="lg" color={colors.black} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
