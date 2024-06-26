import * as Dialog from '@radix-ui/react-dialog';
import { HeaderContainer, HeaderContent, NewInstallmentButton } from './styles';

import { Profile } from './components/Profile';
import { FormInstallment } from '../FormInstallment';
import { useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';

export function Header() {
  const user = useContextSelector(AuthContext, (context) => context?.user);

  const { pathname } = useLocation();

  const [formDialog, setFormDialog] = useState(false);

  const handleNewInstallmentDialog = (status: boolean) => {
    setFormDialog(status);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Profile />

        {/* <img src={logoImg} alt="" /> */}

        {user?.role === 'ADMIN' && pathname?.includes('/home') && (
          <Dialog.Root open={formDialog}>
            <Dialog.Trigger asChild>
              <NewInstallmentButton
                onClick={() => handleNewInstallmentDialog(true)}
              >
                Adicionar
              </NewInstallmentButton>
            </Dialog.Trigger>
            <FormInstallment
              handleNewInstallmentDialog={handleNewInstallmentDialog}
            />
          </Dialog.Root>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
}
