import * as Dialog from '@radix-ui/react-dialog';
import { HeaderContainer, HeaderContent, NewInstallmentButton } from './styles';

import logoImg from '../../assets/logo.svg';
import { NewInstallmentModal } from '../NewInstallMent';

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewInstallmentButton>Adicionar Prestação</NewInstallmentButton>
          </Dialog.Trigger>
          <NewInstallmentModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
