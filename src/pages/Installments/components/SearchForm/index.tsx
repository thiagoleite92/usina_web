import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FunnelSimple, X } from 'phosphor-react';
import { SearchFormContainer } from './styles';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContextSelector } from 'use-context-selector';
import { InstallmentsContext } from '../../../../contexts/InstallmentContext';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { breakpoint } from '../../../../const/breakpoint';
import { useState } from 'react';
import dayjs from 'dayjs';
import { SelectInput } from '../../../../components/Select';
import { useSelectAvailablePeriods } from '../../../../hooks/useParseMonthAndYear';

const querySchema = z.object({
  perPage: z.string().default('10'),
  page: z.string().default('1'),
  period: z.array(z.string()),
});

type SearchForm = z.infer<typeof querySchema>;

export function SearchForm() {
  const [haveSearched, setHaveSearched] = useState(false);
  const { width } = useWindowSize();

  const handleQueryParams = useContextSelector(
    InstallmentsContext,
    (context) => context.handleQueryParams
  );

  const selectOptions = useSelectAvailablePeriods();

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<SearchForm>({
    resolver: zodResolver(querySchema),
    defaultValues: {
      period: [
        dayjs().startOf('month').format('YYYY-MM-DD'),
        dayjs().endOf('month').format('YYYY-MM-DD'),
      ],
    },
  });

  function handleFilter({ perPage, page, period }: SearchForm) {
    handleQueryParams({ page, perPage, period });
    setHaveSearched(true);
  }

  function handleClearQuery() {
    reset();
    handleQueryParams({
      page: '1',
      perPage: '10',
      period: [
        dayjs().startOf('month').format('YYYY-MM-DD'),
        dayjs().endOf('month').format('YYYY-MM-DD'),
      ],
    });
    setHaveSearched(false);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleFilter)}>
      <Controller
        control={control}
        name="period"
        render={({ field }) => (
          <SelectInput
            options={selectOptions}
            placeholder="Selecionar Período"
            {...field}
          />
        )}
      />

      <button type="submit" disabled={isSubmitting}>
        <FunnelSimple size={20} />
        {width && width > breakpoint && 'Filtrar'}
      </button>
      {haveSearched && (
        <button onClick={handleClearQuery}>
          <X size={20} /> {width && width > breakpoint && 'Limpar'}
        </button>
      )}
    </SearchFormContainer>
  );
}
