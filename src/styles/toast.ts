import { ToastContainer } from 'react-toastify';
import styled, { css } from 'styled-components';
import { breakpoint } from '../const/breakpoint';

interface ToastContainerProps {
  width: number | undefined;
}

export const GlobalToast = styled(ToastContainer)<ToastContainerProps>`
  .Toastify__toast--success {
    background-color: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme['white']};

    ${(props) =>
      props?.width &&
      props?.width < breakpoint &&
      css`
        margin: 0 2.5rem 1.5rem;
        border-radius: 6px;
      `}
  }

  .Toastify__toast--error {
    background-color: ${(props) => props.theme['red-500']};
    color: ${(props) => props.theme['white']};

    ${(props) =>
      props?.width &&
      props.width < breakpoint &&
      css`
        margin: 0 2.5rem 1.5rem;
        border-radius: 6px;
      `}
  }
`;
