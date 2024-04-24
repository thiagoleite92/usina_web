import styled from 'styled-components';

export const UsersContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 1rem auto 0;
  padding: 0 1.5rem;
  flex: 1;
`;

export const TitleContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme['gray-100']};
  padding-bottom: 0.5rem;
`;

export const UsersTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.4rem;
  margin-top: 0.5rem;

  th {
    text-align: left;
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:last-child {
      text-align: center;
    }
  }

  td {
    text-align: left;
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      text-align: center;
    }

    .SwitchRoot {
      width: 42px;
      height: 25px;
      background-color: ${(props) => props.theme['red-700']};
      border-radius: 9999px;
      position: relative;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      border: 1px solid transparent;
    }
    .SwitchRoot:focus {
      box-shadow: 0 0 0 0 transparent;
    }
    .SwitchRoot[data-state='checked'] {
      background-color: ${(props) => props.theme['green-700']};
    }

    .SwitchThumb {
      display: block;
      width: 21px;
      height: 21px;
      background-color: ${(props) => props.theme['red-300']};
      border-radius: 9999px;
      border: 1px solid transparent;
      transition: transform 100ms;
      transform: translateX(0);
      will-change: transform;
    }
    .SwitchThumb[data-state='checked'] {
      background-color: ${(props) => props.theme['green-300']};
      transform: translateX(19px);
    }
  }

  .btnSaveChanges {
    border: none;
    margin-top: 6px;
    padding: 8px 12px;
    border-radius: 6px;
    background-color: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme['gray-100']};
    cursor: pointer;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;
