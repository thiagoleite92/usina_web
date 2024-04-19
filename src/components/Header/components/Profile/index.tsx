import { SignOut, User, UserGear, UsersFour } from 'phosphor-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Option, UserButton } from './styles';
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function Profile() {
  const logout = useContextSelector(AuthContext, (context) => context.logout);
  const navigate = useNavigate();

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
            <Option onClick={() => navigate('/admin/moradores')}>
              Moradores <UsersFour size={24} />
            </Option>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem">
            <Option onClick={() => console.log('oi')}>
              Administrador <UserGear size={24} />
            </Option>
          </DropdownMenu.Item>
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
