import { ControllerRenderProps } from 'react-hook-form';
import { SelectContainer } from './styles';

type SelectInputProps = ControllerRenderProps & {
  placeholder: string;
  options: { value: string | string[]; label: string }[];
  defaultValue?: { value: string | string[]; label: string };
};

type SelectCreatableProps = ControllerRenderProps &
  SelectInputProps & {
    createNewIOptionLabel: string;
  };

export function SelectCreatable({
  onChange,
  placeholder,
  options,
  createNewIOptionLabel,
}: SelectCreatableProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    onChange(e?.label);
  };

  return (
    <SelectContainer
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      formatCreateLabel={(value) => `${createNewIOptionLabel}: ${value}`}
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
}

export function SelectInput({
  onChange,
  placeholder,
  options,
  defaultValue,
}: SelectInputProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    console.log(e?.value);
    onChange(e?.value);
  };
  if (!options) return;

  return (
    <SelectContainer
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      className="react-select-container"
      classNamePrefix="react-select"
      defaultValue={defaultValue}
    />
  );
}
