'use client';

import {
  ListCollection,
  Portal,
  Select,
  SelectValueChangeDetails,
  createListCollection,
} from '@chakra-ui/react';

type Props = {
  data: ListCollection<{ label: string; value: string }>;
  value: string[];
  onChange: (
    details: SelectValueChangeDetails<{ label: string; value: string }>
  ) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
};

export const CustomSelect = ({ data, onChange, value }: Props) => {
  return (
    <Select.Root
      collection={data}
      size="sm"
      maxWidth="320px"
      value={value}
      onValueChange={onChange}
    >
      <Select.HiddenSelect />
      <Select.Label>Role</Select.Label>
      <Select.Control>
        <Select.Trigger border={'1px solid #ccc'} p={1}>
          <Select.ValueText placeholder="Select a role" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {data.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
