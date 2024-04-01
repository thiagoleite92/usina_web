import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { MagnifyingGlass, X } from 'phosphor-react';
import { SearchFormContainer } from './styles';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContextSelector } from 'use-context-selector';
import { InstallmentsContext } from '../../../../contexts/InstallmentContext';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { breakpoint } from '../../../../const/breakpoint';
import { useState } from 'react';
import { SelectInput } from '../../../../components/Select';
import { useInitialPeriod } from '../../../../hooks/useInitialPeriod';

const querySchema = z.object({
  perPage: z.string().default('10'),
  page: z.string().default('1'),
  period: z.array(z.string()),
});

type SearchForm = z.infer<typeof querySchema>;

export function SearchForm() {
  const initialPeriod = useInitialPeriod();
  const [haveSearched, setHaveSearched] = useState(false);
  const { width } = useWindowSize();

  const { handleQueryParams, periodsAvailable } = useContextSelector(
    InstallmentsContext,
    (context) => ({
      handleQueryParams: context.handleQueryParams,
      periodsAvailable: context.periodsAvailable,
    })
  );

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
    watch,
  } = useForm<SearchForm>({
    resolver: zodResolver(querySchema),
    defaultValues: {
      period: initialPeriod,
    },
  });

  function handleSearch({ perPage, page, period }: SearchForm) {
    handleQueryParams({ page, perPage, period });
    setHaveSearched(true);
  }

  function handleClearQuery() {
    reset();
    handleQueryParams({
      page: '1',
      perPage: '10',
      period: initialPeriod,
    });
    setHaveSearched(false);
  }

  const periodWatch = watch('period');

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearch)}>
      <Controller
        control={control}
        name="period"
        render={({ field }) => (
          <SelectInput
            options={periodsAvailable}
            placeholder="Selecionar Período"
            clear={haveSearched}
            {...field}
          />
        )}
      />

      {periodWatch[0]?.split('-')[1] !== initialPeriod[0]?.split('-')[1] && (
        <button type="submit" disabled={isSubmitting}>
          <MagnifyingGlass size={20} />
          {width && width > breakpoint && 'Buscar'}
        </button>
      )}
      {haveSearched && (
        <button onClick={handleClearQuery}>
          <X size={20} /> {width && width > breakpoint && 'Limpar'}
        </button>
      )}
    </SearchFormContainer>
  );
}
