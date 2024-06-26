import styled from 'styled-components';

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 0.5rem;
  width: 100%;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['white']};

    padding: 0.5rem;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    border: 0;
    padding: 1rem;
    background: transparent;
    border: 1px solid ${(props) => props.theme['green-300']};
    color: ${(props) => props.theme['gray-300']};
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;

    &:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${(props) => props.theme['green-500']};
      border-color: 1p solid ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme['white']};
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }
`;
