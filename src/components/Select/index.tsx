/* eslint-disable @typescript-eslint/no-explicit-any */

import { ControllerRenderProps } from 'react-hook-form';
import { SelectContainer } from './styles';
import { useState } from 'react';

type SelectInputProps = ControllerRenderProps & {
  placeholder: string;
  options: { value: string | string[]; label: string }[];
  defaultOption?: any;
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
  defaultOption,
}: SelectCreatableProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [value, setValue] = useState<{ label: string; value: string[] } | null>(
    null
  );

  const handleChange = (e: any) => {
    console.log(e);
    setValue({ value: e?.value, label: e?.label });
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
      value={value || options.find((item) => item?.value === defaultOption)}
    />
  );
}

export function SelectInput({
  onChange,
  placeholder,
  options,
}: SelectInputProps) {
  const [value, setValue] = useState<{ label: string; value: string[] } | null>(
    null
  );

  const handleChange = (e: any) => {
    setValue({ value: e?.value, label: e?.label });
    onChange(e?.value);
  };

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

export function UnitSelect({
  options,
  placeholder,
  onChange,
}: {
  placeholder: string;
  options: { value: string | string[]; label: string }[];
  onChange: (e: any) => void;
}) {
  const [value, setValue] = useState<{ label: string; value: string[] } | null>(
    null
  );

  const handleChange = (e: any) => {
    setValue({ value: e?.value, label: e?.label });
    onChange(e);
  };

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
