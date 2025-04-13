"use client";

import { NativeSelect } from "@chakra-ui/react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { SelectData } from "@/types";

type Props<TFormValues extends FieldValues> = {
  placeholder: string;
  register: UseFormRegister<TFormValues>;
  name: Path<TFormValues>;
  data: SelectData[];
};
export const CustomSelect = <TFormValues extends FieldValues>({
  placeholder,
  data,
  name,
  register,
}: Props<TFormValues>) => {
  return (
    <NativeSelect.Root
      size="md"
      width="100%"
      colorPalette={"black"}
      borderColor={"black"}
    >
      <NativeSelect.Field
        placeholder={placeholder}
        {...register(name)}
        color={"black"}
        border={"1px solid black"}
        height={"44px"}
        p={2}
      >
        {data.map((d) => (
          <option value={d.value} key={d.value}>
            {d.label}
          </option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
};
