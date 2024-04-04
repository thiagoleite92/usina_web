import styled from 'styled-components';

export const DeleteInstallmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  gap: 30px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const Button = styled.button`
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
`;

export const ConfirmButton = styled(Button)``;

export const BackButton = styled(Button)`
  background: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-500']};
    transition: background 0.2s;
  }
`;
