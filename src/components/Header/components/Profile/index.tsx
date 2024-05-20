import { SignOut, User } from 'phosphor-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Option, UserButton } from './styles';
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../../../../hooks/useAuth';

export function Profile() {
  const logout = useContextSelector(AuthContext, (context) => context.logout);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <UserButton aria-label="Customise options">
          <User size={24} />
        </UserButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={-5}>
          <DropdownMenu.Item className="DropdownMenuItem">
            <Option onClick={logout}>
              Sair <SignOut size={24} />
            </Option>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
