import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled from 'styled-components';

export const UserButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;

  svg {
    background-color: ${(props) => props.theme['white']};
    color: ${(props) => props.theme['gray-600']};
  }
`;

export const Option = styled.span`
  cursor: pointer;
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background-color: ${(props) => props.theme['white']};
  color: ${(props) => props.theme['gray-600']};

  svg {
    background-color: ${(props) => props.theme['white']};
    color: ${(props) => props.theme['gray-600']};
  }
`;

export const Separator = styled(DropdownMenu.Separator)`
  height: 1px;
  background-color: ${(props) => props.theme['gray-600']};
  margin: 5px;
`;
