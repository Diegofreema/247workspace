'use client';

import { colors } from '@/constants';

import {
  CloseButton,
  Dialog,
  IconButton,
  Image,
  Portal,
  Stack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconPhotoCirclePlus } from '@tabler/icons-react';

import { useCreateProject } from '@/features/projects/api/use-create-project';
import { createProjectSchema } from '@/features/projects/schema';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { useCreateProjectModalController } from '@/lib/nuqs/use-create-project';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../custom/custom-button';
import { FlexBox } from '../custom/flex-box';
import { FormInput } from '../form/form-input';
import { usePathname } from 'next/navigation';

export const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectModalController();
  const [mounted, setMounted] = useState(false);
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  const isProjectPage = pathname.split('/')[3] === 'projects';

  const { mutateAsync } = useCreateProject(isProjectPage);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setMounted(true);
  }, []);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    control,
  } = useForm<z.infer<typeof createProjectSchema>>({
    defaultValues: {
      name: '',
      image: '',
      workspaceId: workspaceId,
    },
    resolver: zodResolver(createProjectSchema),
  });

  const onSubmit = async (data: z.infer<typeof createProjectSchema>) => {
    const finalValues = {
      ...data,
      image: data.image instanceof File ? data.image : '',
      workspaceId,
    };
    await mutateAsync({ form: finalValues });
    reset();
    close();
  };
  const onCancel = () => {
    reset();
    close();
  };

  if (!mounted) return null;
  return (
    <Dialog.Root
      placement="center"
      motionPreset={'slide-in-bottom'}
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
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
                  Create a new project
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
                          <p className="text-sm text-black">Project icon</p>
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
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
