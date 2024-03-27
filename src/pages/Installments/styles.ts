import { Pencil, Trash } from 'phosphor-react';
import styled from 'styled-components';

export const InstallmentsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 1rem auto 0;
  padding: 0 1.5rem;
`;

export const InstallmentsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.4rem;
  margin-top: 0.5rem;

  th {
    text-align: left;
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};
  }

  td {
    text-align: left;
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      text-align: center;
    }
  }
`;

interface PriceHighLightProps {
  variant: 'INCOME' | 'OUTCOME';
}

export const PriceHighLight = styled.span<PriceHighLightProps>`
  color: ${(props) =>
    props.variant === 'INCOME'
      ? props.theme['green-300']
      : props.theme['red-300']};
`;

export const PencilIcon = styled(Pencil)`
  color: ${(props) => props.theme['green-300']};
  &:hover {
    cursor: 'pointer';
  }
`;

export const TrashIcon = styled(Trash)`
  color: ${(props) => props.theme['red-300']};
  cursor: 'pointer';
`;
