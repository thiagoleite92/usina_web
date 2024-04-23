import styled from 'styled-components';

export const InstallmentsContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 1rem auto 0;
  padding: 0 1.5rem;
  flex: 1;
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

    &:last-child {
      text-align: center;
    }
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

export const OptionsContainer = styled.div`
  gap: 10px;
  padding: 0.5rem;
  display: flex;
  gap: 1.5rem;
  cursor: 'pointer';

  svg {
    color: ${(props) => props.theme['green-300']};
    &:hover {
    }

    & + svg {
      color: ${(props) => props.theme['red-300']};
    }
  }
`;
