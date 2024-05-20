import { useContextSelector } from 'use-context-selector';
import { InstallmentsContext } from '../../../../contexts/InstallmentContext';
import { UnitSelect } from '../../../../components/Select';

export function SearchForm() {
  const { periodsAvailable, handleQueryParams } = useContextSelector(
    InstallmentsContext,
    (context) => ({
      handleQueryParams: context.handleQueryParams,
      periodsAvailable: context.periodsAvailable,
    })
  );

  const handleChange = (e: { label: string; value: string[] }) => {
    handleQueryParams({ page: '1', perPage: '10', period: e.value });
  };

  return (
    <UnitSelect
      options={periodsAvailable}
      placeholder="Selecionar Período"
      onChange={handleChange}
    />
  );
}
