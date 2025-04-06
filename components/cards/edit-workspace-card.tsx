'use client';
import { colors } from '@/constants';
import { useCreateWorkspace } from '@/features/workspaces/api/use-create-workspace';
import { editWorkspaceSchema } from '@/features/workspaces/schema';

import { Button, Card, Image, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconArrowLeft, IconPhotoCirclePlus } from '@tabler/icons-react';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormInput } from '../form/form-input';
import { Workspace } from '@/types';
import { useUpdateWorkspace } from '@/features/workspaces/api/use-update-workspace';
import { FlexBox } from '../custom/flex-box';
import { CustomText } from '../custom/title';
import { useRouter } from 'next/navigation';

type Props = {
  initialValue: Workspace;
  onCancel?: () => void;
};

export const EditWorkspaceCard = ({ initialValue, onCancel }: Props) => {
  const { mutateAsync } = useUpdateWorkspace();
  let inputRef = useRef<HTMLInputElement>(null);
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
    await mutateAsync({
      form: finalValues,
      param: { workspaceId: initialValue.$id },
    });
    reset();
  };
  const handleCancel = () => {
    onCancel ? onCancel : router.back();
  };
  const { name, image } = watch();
  const disable =
    (name.trim() === initialValue.name.trim() &&
      image === initialValue.imageUrl) ||
    (name.trim() === initialValue.name.trim() && image === '');
  return (
    <Card.Root bg={colors.white} boxShadow={'md'}>
      <Card.Body gap="2">
        <FlexBox alignItems={'center'} gap={2}>
          <IconArrowLeft color={colors.black} onClick={handleCancel} />
          <CustomText fontSize={12} color={colors.black} fontWeight={'bold'}>
            Back
          </CustomText>
        </FlexBox>
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
