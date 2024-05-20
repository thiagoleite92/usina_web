import { ptBR } from 'date-fns/locale';
import DatePicker, { registerLocale } from 'react-datepicker';
registerLocale('ptBR', ptBR);
import 'react-datepicker/dist/react-datepicker.css';
import { ControllerRenderProps } from 'react-hook-form';

type DateInputProps = ControllerRenderProps & {
  dateFormat?: string;
  placeholder?: string;
  showMonthYearPicker: boolean;
};

export function DateInput({
  onChange,
  value,
  dateFormat = 'dd/mmmm/yyyy',
  showMonthYearPicker,
  placeholder = 'Selecione Data',
}: DateInputProps) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      placeholderText={placeholder}
      locale="ptBR"
      isClearable
      showMonthYearPicker={showMonthYearPicker}
      dateFormat={dateFormat}
    />
  );
}
