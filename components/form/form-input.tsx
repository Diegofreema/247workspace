import { Field, Group, Input, Textarea } from "@chakra-ui/react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { colors } from "@/constants";
import { CustomSelect } from "./custom-select";
import { DatePicker } from "../ui/date-picker";
import { SelectData } from "@/types";
import { ShadCnSelect } from "@/components/form/ShandCnSelect";

type FormInputProps<TFormValues extends FieldValues> = {
  errors: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  placeholder: string;
  type?: "text" | "password";
  togglePassword?: () => void;
  password?: boolean;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  select?: boolean;
  variant?: "text" | "select" | "textarea" | "date";
  data?: SelectData[];
};

export const FormInput = <TFormValues extends FieldValues>({
  errors,
  register,
  name,
  label,
  placeholder,
  type = "text",

  disabled,
  required,
  helperText,

  data,
  variant = "text",
}: FormInputProps<TFormValues>) => {
  return (
    <Field.Root invalid={!!errors[name]} width="100%" required={required}>
      <Field.Label color={colors.black}>
        {label} <Field.RequiredIndicator />
      </Field.Label>
      {variant === "select" && data && (
        <CustomSelect
          data={data}
          placeholder={placeholder}
          register={register}
          name={name}
        />
      )}
      {variant === "text" && (
        <Group
          attached
          w="full"
          maxW="100%"
          borderWidth={1}
          borderStyle={"solid"}
          borderColor={colors.grey}
          borderRadius={5}
        >
          <Input
            flex="1"
            {...register(name)}
            borderColor="transparent"
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            p={3}
            color={colors.black}
            css={{ "--error-color": "red" }}
          />
        </Group>
      )}
      {variant === "textarea" && (
        <Textarea
          flex="1"
          {...register(name)}
          placeholder={placeholder}
          disabled={disabled}
          w="full"
          maxW="100%"
          borderWidth={1}
          borderStyle={"solid"}
          borderColor={colors.grey}
          borderRadius={5}
          p={3}
          color={colors.black}
          css={{ "--error-color": "red" }}
        />
      )}

      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
      <Field.ErrorText>{errors[name]?.message as string}</Field.ErrorText>
    </Field.Root>
  );
};

type FormInputDateProps<TFormValues extends FieldValues> = {
  errors: FieldErrors<TFormValues>;
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  placeholder?: string;
  disabled: boolean;
  required?: boolean;
  helperText?: string;
  variant?: "date";
  data?: SelectData[];
};

export const FormInputDate = <TFormValues extends FieldValues>({
  errors,
  control,
  name,
  label,
  placeholder,
  disabled,
  required,
  helperText,
}: FormInputDateProps<TFormValues>) => {
  return (
    <Field.Root invalid={!!errors[name]} width="100%" required={required}>
      <Field.Label color={colors.black}>
        {label} <Field.RequiredIndicator />
      </Field.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
      />

      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
      <Field.ErrorText>{errors[name]?.message as string}</Field.ErrorText>
    </Field.Root>
  );
};
export const FormInputShadCnSelect = <TFormValues extends FieldValues>({
  errors,
  control,
  name,
  label,
  placeholder,
  disabled,
  required,
  helperText,
  data,
}: FormInputDateProps<TFormValues>) => {
  return (
    <Field.Root invalid={!!errors[name]} width="100%" required={required}>
      <Field.Label color={colors.black}>
        {label} <Field.RequiredIndicator />
      </Field.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ShadCnSelect
            data={data || []}
            placeholder={placeholder || "Select a item"}
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          />
        )}
      />

      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
      <Field.ErrorText>{errors[name]?.message as string}</Field.ErrorText>
    </Field.Root>
  );
};
