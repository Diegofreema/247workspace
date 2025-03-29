import {
  Field,
  Group,
  IconButton,
  Input,
  ListCollection,
} from '@chakra-ui/react';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import { colors } from '@/constants';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { CustomSelect } from './custom-select';
type FormInputProps<TFormValues extends FieldValues> = {
  errors: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  placeholder: string;
  type?: 'text' | 'password';
  togglePassword?: () => void;
  password?: boolean;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  select?: boolean;
  data?: ListCollection<{
    label: string;
    value: string;
  }>;
};

export const FormInput = <TFormValues extends FieldValues>({
  errors,
  register,
  name,
  label,
  placeholder,
  type = 'text',
  password,
  togglePassword,
  disabled,
  required,
  helperText,
  select,
  data,
}: FormInputProps<TFormValues>) => {
  const hide = type === 'password';

  return (
    <Field.Root invalid={!!errors.email} width="100%" required={required}>
      <Field.Label color={colors.black}>
        {label} <Field.RequiredIndicator />
      </Field.Label>
      {select && data ? (
        <CustomSelect
          data={data}
          placeholder={placeholder}
          register={register}
          name={name}
        />
      ) : (
        <Group
          attached
          w="full"
          maxW="100%"
          borderWidth={1}
          borderStyle={'solid'}
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
            css={{ '--error-color': 'red' }}
          />
          {password && (
            <IconButton onClick={togglePassword}>
              {hide ? (
                <IconEye color={colors.black} />
              ) : (
                <IconEyeOff color={colors.black} />
              )}
            </IconButton>
          )}
        </Group>
      )}
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
      <Field.ErrorText>{errors[name]?.message as string}</Field.ErrorText>
    </Field.Root>
  );
};
