'use client';
import { colors } from '@/constants';
import { editWorkspaceSchema } from '@/features/workspaces/schema';

import { useUpdateWorkspace } from '@/features/workspaces/api/use-update-workspace';
import { Project, Workspace } from '@/types';
import { Button, Card, Image, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconArrowLeft, IconPhotoCirclePlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { FormInput } from '@/components/form/form-input';
import { useUpdateProject } from '../api/use-update-project';
import { useEditProjectModalController } from '@/lib/nuqs/use-edit-project-modal';

type Props = {
  initialValue: Project;
  onCancel?: () => void;
  isModal?: boolean;
};

export const EditProjectCard = ({ initialValue, onCancel, isModal }: Props) => {
  const { mutateAsync } = useUpdateProject();
  const inputRef = useRef<HTMLInputElement>(null);
  const { close } = useEditProjectModalController();
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    control,
    watch,
  } = useForm<z.infer<typeof editWorkspaceSchema>>({
    defaultValues: {
      ...initialValue,
      image: initialValue.imageUrl ?? '',
    },
    resolver: zodResolver(editWorkspaceSchema),
  });
  const onSubmit = async (data: z.infer<typeof editWorkspaceSchema>) => {
    const finalValues = {
      ...data,
      image: data.image instanceof File ? data.image : '',
    };
    await mutateAsync(
      {
        form: finalValues,
        param: { projectId: initialValue.$id },
      },
      {
        onSuccess: () => {
          reset();
          close();
        },
      }
    );
  };
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };
  const { name, image } = watch();
  const disable =
    (name.trim() === initialValue.name.trim() &&
      image === initialValue.imageUrl) ||
    (name.trim() === initialValue.name.trim() && image === '');
  const bg = isModal ? 'transparent' : colors.white;
  const boxShadow = isModal ? 'none' : 'md';
  return (
    <Card.Root bg={bg} boxShadow={boxShadow}>
      <Card.Body gap="2">
        {!isModal && (
          <FlexBox alignItems={'center'} gap={2}>
            <IconArrowLeft color={colors.black} onClick={handleCancel} />
            <CustomText fontSize={12} color={colors.black} fontWeight={'bold'}>
              Back
            </CustomText>
          </FlexBox>
        )}
        <Card.Title mt="2" color={colors.black} display={'flex'}>
          {initialValue.name}
        </Card.Title>
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
                        px={2}
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
                        px={2}
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
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button
          bg={colors.purple}
          onClick={handleSubmit(onSubmit)}
          disabled={disable || isSubmitting}
          loading={isSubmitting}
          width={'fit-content'}
          px={2}
        >
          Save changes
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};
