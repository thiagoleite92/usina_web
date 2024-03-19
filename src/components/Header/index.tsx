import * as Dialog from '@radix-ui/react-dialog';
import { HeaderContainer, HeaderContent, NewInstallmentButton } from './styles';

import { NewInstallmentModal } from '../NewInstallMent';
import { Profile } from './components/Profile';

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
          <NewInstallmentModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
