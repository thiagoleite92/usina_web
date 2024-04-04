import * as Dialog from '@radix-ui/react-dialog';
import { HeaderContainer, HeaderContent, NewInstallmentButton } from './styles';

import { Profile } from './components/Profile';
import { FormInstallment } from '../FormInstallment';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Profile />

        {/* <img src={logoImg} alt="" /> */}

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewInstallmentButton>Adicionar</NewInstallmentButton>
          </Dialog.Trigger>
          <FormInstallment />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
