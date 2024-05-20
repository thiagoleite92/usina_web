import * as Dialog from '@radix-ui/react-dialog';

import { BackButton, ButtonsContainer, ConfirmButton } from './styles';
import { CloseButton, Content, Overlay } from '../FormInstallment/styles';
import { X } from 'phosphor-react';
import { api } from '../../lib/axios';
import { useContextSelector } from 'use-context-selector';
import { InstallmentsContext } from '../../contexts/InstallmentContext';
import { useWindowSize } from '../../hooks/useWindowSize';

interface DeleteInstallmentProps {
  installmentId: string;
  handleDeleteDialog: () => void;
}

export function DeleteInstallment({
  installmentId,
  handleDeleteDialog,
}: DeleteInstallmentProps) {
  const { width } = useWindowSize();

  const deleteInstallment = useContextSelector(
    InstallmentsContext,
    (context) => context.deleteInstallment
  );

  const handleConfirmDelete = async () => {
    try {
      await api.delete('/installment/' + installmentId, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!),
        },
      });

      deleteInstallment(installmentId);
      handleDeleteDialog();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog.Portal>
      <Overlay />
      <Content width={width}>
        <Dialog.Title>Confirmar Deleção?</Dialog.Title>
        <Dialog.Close asChild>
          <CloseButton onClick={handleDeleteDialog}>
            <X size={24} />
          </CloseButton>
        </Dialog.Close>

        <ButtonsContainer>
          <Dialog.Close asChild>
            <BackButton onClick={handleDeleteDialog}>Cancelar</BackButton>
          </Dialog.Close>

          <ConfirmButton onClick={handleConfirmDelete}>Confirmar</ConfirmButton>
        </ButtonsContainer>
      </Content>
    </Dialog.Portal>
  );
}
