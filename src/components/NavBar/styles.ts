import styled from 'styled-components';
import { breakpoint } from '../../const/breakpoint';
import { css } from 'styled-components';

interface NavBarContainerProps {
  width?: number;
}

export const NavBarContainer = styled.nav<NavBarContainerProps>`
  width: 100%;
  max-width: 1120px;
  padding: 0 24px;

  ul {
    color: ${(props) => props.theme['white']};
    background-color: ${(props) => props.theme['gray-600']};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;

    ${(props) =>
      props?.width && props?.width >= breakpoint
        ? css`
            margin-bottom: 1.5rem;
            border-radius: 6px;
            font-size: 16px;
          `
        : css`
            margin-bottom: 0.5rem;
            border-radius: 0;
            font-size: 14px;
          `}

    li {
      list-style: none;
      cursor: pointer;
      padding: 0.5rem;
    }

    .SeparatorRoot {
      background-color: white;
    }

    .SeparatorRoot[data-orientation='vertical'] {
      height: 1px;
      width: 5px;
    }

    .Text {
      color: white;
      font-size: 15px;
      line-height: 20px;
    }

    .selected {
      border-radius: 6px;
      color: ${(props) => props.theme['gray-600']};
      background-color: ${(props) => props.theme['white']};
    }
  }
`;
