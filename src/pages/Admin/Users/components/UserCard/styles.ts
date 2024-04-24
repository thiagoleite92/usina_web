import styled from 'styled-components';

interface UserCardContainerProps {
  isActive: boolean;
}
export const UserCardContainer = styled.div<UserCardContainerProps>`
  height: 140px;
  display: flex;
  flex-direction: column;
  gap: 25px;

  border-radius: 6px;
  align-items: start;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme['green-500'] : theme['red-500']};
  margin: 10px 0;
  font-size: 1rem;
  border-bottom-left-radius: 6px;

  .user-info {
    padding: 0.75rem 1.25rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 1;
  }

  ul {
    display: flex;
    width: 100%;
    justify-content: space-between;
    background-color: ${({ theme }) => theme['gray-800']};
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;

    li {
      padding: 0 0.25rem;
      flex: 1;
      list-style: none;
      padding: 0.5rem 1.75rem;

      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
    }

    .li-on {
      background-color: ${({ isActive, theme }) =>
        isActive ? theme['green-500'] : theme['green-300']};
    }

    .li-off {
      background-color: ${({ isActive, theme }) =>
        isActive ? theme['red-300'] : theme['red-500']};
    }
  }
`;
