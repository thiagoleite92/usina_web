import styled from 'styled-components';

export const InstallmentCardContainer = styled.div`
  height: 140px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  align-items: start;
  justify-content: start;
  background-color: ${(props) => props.theme['gray-600']};
  margin: 10px 0;
  font-size: 1rem;

  .installment-info,
  .installment-options {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .installment-options {
    .options {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  gap: 15px;
  align-items: end;

  button {
    color: ${(props) => props.theme['gray-300']};
    background-color: transparent;
    border: none;
  }
`;
