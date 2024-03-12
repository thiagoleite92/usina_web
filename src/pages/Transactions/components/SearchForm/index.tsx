import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MagnifyingGlass } from 'phosphor-react';
import { SerachFormContainer } from './styles';
import { zodResolver } from '@hookform/resolvers/zod';

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchForm = z.infer<typeof searchFormSchema>;

export function SearchForm() {
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
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    console.log(data);
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
