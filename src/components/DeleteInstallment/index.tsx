import * as Dialog from '@radix-ui/react-dialog';

import {
  BackButton,
  ButtonsContainer,
  ConfirmButton,
  DeleteInstallmentContainer,
} from './styles';
import { CloseButton } from '../FormInstallment/styles';
import { X } from 'phosphor-react';
import { api } from '../../lib/axios';
import { useContextSelector } from 'use-context-selector';
import { InstallmentsContext } from '../../contexts/InstallmentContext';

interface DeleteInstallmentProps {
  installmentId: string;
}

export function DeleteInstallment({ installmentId }: DeleteInstallmentProps) {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DeleteInstallmentContainer>
      <Dialog.Title>Confirmar Deleção?</Dialog.Title>
      <CloseButton>
        <X size={24} />
      </CloseButton>

      <ButtonsContainer>
        <Dialog.Close asChild>
          <BackButton>Cancelar</BackButton>
        </Dialog.Close>

        <ConfirmButton onClick={handleConfirmDelete}>Confirmar</ConfirmButton>
      </ButtonsContainer>
    </DeleteInstallmentContainer>
  );
}
