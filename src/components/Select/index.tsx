import { ControllerRenderProps } from 'react-hook-form';
import { SelectContainer } from './styles';
import { useEffect, useState } from 'react';

type SelectInputProps = ControllerRenderProps & {
  placeholder: string;
  options: { value: string | string[]; label: string }[];
  defaultValue?: { value: string | string[]; label: string };
  clear?: boolean;
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
  clear,
}: SelectInputProps) {
  const [value, setValue] = useState<{ label: string; value: string[] } | null>(
    null
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setValue({ value: e?.value, label: e?.label });
    onChange(e?.value);
  };

  useEffect(() => {
    if (!clear) {
      setValue(null);
    }
  }, [clear]);

  return (
    options && (
      <SelectContainer
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        className="react-select-container"
        classNamePrefix="react-select"
        value={value || options[1]}
      />
    )
  );
}
