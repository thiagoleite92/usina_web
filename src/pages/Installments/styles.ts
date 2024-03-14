import { Gear } from 'phosphor-react';
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
  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
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

export const GearIcon = styled(Gear)`
  cursor: pointer;
`;
