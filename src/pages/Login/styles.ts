import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: red;
`;

export const LoginForm = styled.form`
  width: 50vh;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: ${(props) => props.theme['white']};
  padding: 1.5rem;
  border-radius: 6px;

  input {
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  button[type='submit'] {
    height: 58px;
    border: 0;
    background: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme['white']};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    margin-top: 1.5rem;
    cursor: pointer;

    &:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${(props) => props.theme['green-500']};
      transition: background 0.2s;
    }
  }
`;
