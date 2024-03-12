import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MagnifyingGlass } from 'phosphor-react';
import { SerachFormContainer } from './styles';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionsContext } from '../../../../contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchForm = z.infer<typeof searchFormSchema>;

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
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => context.fetchTransactions
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchForm>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: '',
    },
  });

  async function handleSearchTransactions(data: SearchForm) {
    await fetchTransactions(data?.query);
  }

  return (
    <SerachFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="search"
        placeholder="Busque por Transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} /> Buscar
      </button>
    </SerachFormContainer>
  );
}
