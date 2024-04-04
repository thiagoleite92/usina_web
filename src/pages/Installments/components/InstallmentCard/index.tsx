import { Pencil, TrashSimple } from 'phosphor-react';
import { dateFormatter, priceFormatter } from '../../../../utils/formatter';
import { PriceHighLight } from '../../styles';
import { InstallmentCardContainer, OptionsContainer } from './styles';
import { InstallmentCategory } from '../../../../contexts/InstallmentContext';

interface InstallmentCardProps {
  id: string;
  description: string;
  type: 'INCOME' | 'OUTCOME';
  value: number;
  installmentCategoryId: string;
  createdAt: string;
  isAdmin: boolean;
  date: string;
  installmentCategories: InstallmentCategory[];
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
}: InstallmentCardProps) {
  return (
    <InstallmentCardContainer>
      <div className="installment-options">
        <span>
          {
            installmentCategories.find(
              (category) => category.id === installmentCategoryId
            )?.installmentCategory
          }
        </span>
        {isAdmin && (
          <OptionsContainer>
            <button onClick={() => console.log(id)}>
              <Pencil size={20} />
            </button>
            <button>
              <TrashSimple size={20} />
            </button>
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
