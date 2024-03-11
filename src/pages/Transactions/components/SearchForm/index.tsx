import { MagnifyingGlass } from 'phosphor-react';
import { SerachFormContainer } from './styles';

export function SearchForm() {
  return (
    <SerachFormContainer>
      <input type="search" placeholder="Busque por Transações" />

      <button type="submit">
        <MagnifyingGlass size={20} /> Buscar
      </button>
    </SerachFormContainer>
  );
}
