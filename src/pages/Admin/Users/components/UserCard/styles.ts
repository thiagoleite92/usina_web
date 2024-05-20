import styled, { css } from 'styled-components';

interface UserCardContainerProps {
  isActive: boolean;
}
export const UserCardContainer = styled.div<UserCardContainerProps>`
  min-height: fit-content;
  display: flex;
  flex-direction: column;

  border-radius: 6px;
  align-items: start;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme['green-500'] : theme['red-500']};
  margin: 10px 0;
  font-size: 1rem;
  border-bottom-left-radius: 6px;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  gap: 0.5rem;

  .user-info {
    padding: 0.75rem 1.25rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 1;
    gap: 0.75rem;
  }

  ul {
    display: flex;
    width: 100%;
    justify-content: space-between;
    background-color: ${({ theme }) => theme['gray-800']};

    color: ${({ theme }) => theme['white']};

    li {
      padding: 0 0.25rem;
      flex: 1;
      list-style: none;
      padding: 0.5rem 1.75rem;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    .li-on {
      ${({ isActive, theme }) =>
        isActive
          ? css`
              background-color: ${theme['green-500']};
              border-bottom: 1px solid black;
              border-right: 1px solid black;
            `
          : css`
              background-color: ${theme['green-300']};
              border-right: 1px solid black;
              border-top: 1px solid black;
            `}
    }

    .li-off {
      ${({ isActive, theme }) =>
        isActive
          ? css`
              background-color: ${theme['red-300']};
              border-top: 1px solid black;
            `
          : css`
              background-color: ${theme['red-500']};
              border-bottom: 1px solid black;
            `}
    }
  }
`;
