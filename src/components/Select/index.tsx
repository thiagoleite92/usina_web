import { ControllerRenderProps } from 'react-hook-form';
import { SelectContainer } from './styles';

type SelectInputProps = ControllerRenderProps & {
  placeholder?: string;
  options: { value: string; label: string }[];
  createNewIOptionLabel: string;
};

export function SelectInput({
  onChange,
  placeholder,
  options,
  createNewIOptionLabel,
}: SelectInputProps) {
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
