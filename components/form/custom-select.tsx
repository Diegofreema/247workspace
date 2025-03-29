'use client';

import { colors } from '@/constants';
import { ListCollection, Portal, Select } from '@chakra-ui/react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type Props<TFormValues extends FieldValues> = {
  placeholder: string;
  register: UseFormRegister<TFormValues>;
  name: Path<TFormValues>;
  data: ListCollection<{
    label: string;
    value: string;
  }>;
};
export const CustomSelect = <TFormValues extends FieldValues>({
  placeholder,
  data,
  name,
  register,
}: Props<TFormValues>) => {
  return (
    <Select.Root collection={data} {...register(name)}>
      <Select.HiddenSelect />
      {/* <Select.Label></Select.Label> */}
      <Select.Control>
        <Select.Trigger
          w="full"
          maxW="100%"
          borderWidth={1}
          borderStyle={'solid'}
          borderColor={colors.grey}
          borderRadius={5}
          p={2.5}
          _placeholder={{ color: colors.black, fontStyle: 'italic' }}
        >
          <Select.ValueText placeholder={placeholder} color={colors.black} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {data.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
