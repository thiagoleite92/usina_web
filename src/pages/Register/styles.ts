import styled from 'styled-components';
import { breakpoint } from '../../const/breakpoint';

export const RegisterContainer = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: black;
  padding-bottom: 15px;
`;

interface RegisterFormProps {
  width: number;
}

export const RegisterForm = styled.form<RegisterFormProps>`
  width: 50vh;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: ${(props) =>
    props.width && props.width > breakpoint ? '0.75rem' : '0.5rem'};
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

  .login-warning {
    color: ${(props) => props.theme['red-500']};
    font-size: 14px;
    align-self: center;
  }

  .input-warning {
    color: ${(props) => props.theme['red-500']};
    font-size: 14px;
  }

  button[type='submit'] {
    height: 58px;
    border: 0;
    background: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme['white']};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    margin-top: 0.75rem;
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

export const ResidenceContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;

  .select-container {
    width: 100%;
  }
`;

export const NewAccountContainer = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  .link-register {
    text-decoration: none;
    color: black;

    &:hover {
      text-decoration: underline;
    }
  }
`;
