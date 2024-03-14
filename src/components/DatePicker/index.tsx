import { ptBR } from 'date-fns/locale';
import DatePicker, { registerLocale } from 'react-datepicker';
registerLocale('ptBR', ptBR);
import 'react-datepicker/dist/react-datepicker.css';
import { ControllerRenderProps } from 'react-hook-form';

export function DateInput({ value, onChange }: ControllerRenderProps) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      placeholderText="Selecione a Data"
      locale={ptBR}
      isClearable
    />
  );
}
