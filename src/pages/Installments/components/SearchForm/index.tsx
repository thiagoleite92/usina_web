import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MagnifyingGlass, X } from 'phosphor-react';
import { SearchFormContainer } from './styles';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContextSelector } from 'use-context-selector';
import { InstallmentsContext } from '../../../../contexts/InstallmentContext';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { breakpoint } from '../../../../const/breakpoint';
import { useState } from 'react';

const querySchema = z.object({
  search: z.string().min(3, '3 letras'),
  perPage: z.string().default('10'),
  page: z.string().default('1'),
});

type SearchForm = z.infer<typeof querySchema>;

/**
 * Por que um componente renderiza?
 * - Hooks changed (mudou estado, contexto, reducer);
 * - Props changed (mudou pripriedades);
 * - Parent rerendered (component pai renderizou);
 *
 * Qual o fluxo de renderização?
 * 1. O react recria o HTML da interface daquele componente
 * 2. Compara a versão do HTML recriada com a versão anterior
 * 3 SE mudou alguma coisa, ele reescreve o HTMl na tela
 *
 * Memo:
 * 0. Hooks changed, Props Changed (deep comparison)
 * 0.1 Comparar a versão anetrior dos hooks e props
 * 0.2 SE mudou algo, ele vai permitir o fluxo inicial
 */

export function SearchForm() {
  const [haveSearched, setHaveSearched] = useState(false);
  const { width } = useWindowSize();

  const handleQueryParams = useContextSelector(
    InstallmentsContext,
    (context) => context.handleQueryParams
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SearchForm>({
    resolver: zodResolver(querySchema),
    defaultValues: {
      search: '',
    },
  });

  function handleSearchInstallments({ search, perPage, page }: SearchForm) {
    handleQueryParams({ search, page, perPage });
    setHaveSearched(true);
  }

  function handleClearQuery() {
    reset();
    handleQueryParams({ search: '', page: '1', perPage: '10' });
    setHaveSearched(false);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchInstallments)}>
      <input
        type="text"
        placeholder={
          width && width > breakpoint
            ? `Digite 3 letras para buscar por Descrição ou Categoria.`
            : 'Busque por Descrição ou Categoria'
        }
        {...register('search')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        {width && width > breakpoint && 'Buscar'}
      </button>
      {haveSearched && (
        <button onClick={handleClearQuery}>
          <X size={20} /> {width && width > breakpoint && 'Limpar'}
        </button>
      )}
    </SearchFormContainer>
  );
}
