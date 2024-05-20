import * as Dialog from '@radix-ui/react-dialog';

import { Pencil, Trash } from 'phosphor-react';
import { dateFormatter, priceFormatter } from '../../../../utils/formatter';
import { PriceHighLight } from '../../styles';
import { InstallmentCardContainer, OptionsContainer } from './styles';
import { InstallmentCategory } from '../../../../contexts/InstallmentContext';
import { FormInstallment } from '../../../../components/FormInstallment';
import { DeleteInstallment } from '../../../../components/DeleteInstallment';

interface InstallmentCardProps {
  id: string;
  description: string;
  type: 'INCOME' | 'OUTCOME';
  value: number;
  installmentCategoryId: string;
  isAdmin: boolean;
  date: string;
  installmentCategories: InstallmentCategory[];
  handleDeleteDialog: () => void;
  handleEditDialog: () => void;
}

export function InstallmentCard({
  description,
  id,
  installmentCategoryId,
  type,
  value,
  isAdmin,
  date,
  installmentCategories,
  handleDeleteDialog,
  handleEditDialog,
}: InstallmentCardProps) {
  const installment = {
    description,
    id,
    installmentCategoryId,
    type,
    value,
    isAdmin,
    date,
    installmentCategories,
  };

  return (
    <InstallmentCardContainer>
      <div className="installment-options">
        <span>
          {
            installmentCategories.find(
              (category) =>
                category.id === installmentCategoryId ||
                category.installmentCategory === installmentCategoryId
            )?.installmentCategory
          }
        </span>
        {isAdmin && (
          <OptionsContainer>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Pencil size={24} />
              </Dialog.Trigger>
              <Dialog.Portal>
                <FormInstallment
                  {...installment}
                  handleEditDialog={handleEditDialog}
                />
              </Dialog.Portal>
            </Dialog.Root>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Trash size={24} />
              </Dialog.Trigger>
              <DeleteInstallment
                installmentId={id}
                handleDeleteDialog={handleDeleteDialog}
              />
            </Dialog.Root>
          </OptionsContainer>
        )}
      </div>
      <PriceHighLight variant={type}>
        {type === 'OUTCOME' && '- '}
        {priceFormatter.format(value / 100)}
      </PriceHighLight>

      <div className="installment-info">
        <span>{description}</span>
        <span>
          {dateFormatter({
            month: 'short',
            year: 'numeric',
          }).format(new Date(date))}
        </span>
      </div>
    </InstallmentCardContainer>
  );
}
