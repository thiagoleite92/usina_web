import styled, { css } from 'styled-components';
import { breakpoint } from '../../../../const/breakpoint';

interface NotActiveUserContainerProps {
  width?: number;
}

export const NotActiveUserContainer = styled.div<NotActiveUserContainerProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme['white']};
  color: ${(props) => props.theme['gray-700']};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  gap: 1.5rem;
  border-radius: 6px;
  ${(props) =>
    props?.width && props?.width >= breakpoint
      ? css`
          width: 50%;
          height: 50%;
        `
      : css`
          height: 90%;
          width: 90%;
        `};
  hr {
    height: 2px;
    width: 100%;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    text-align: center;
    svg {
      color: ${(props) => props.theme['green-500']};

      &:hover {
        filter: brightness(0.8);
      }
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    border-radius: 6px;
    padding: 1.25rem 2.25rem;
    border: none;
    background-color: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme['white']};
    cursor: pointer;
    &:hover {
      filter: brightness(0.8);
    }
  }
`;
