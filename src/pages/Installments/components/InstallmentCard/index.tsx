import { Pencil, TrashSimple } from 'phosphor-react';
import { dateFormatter, priceFormatter } from '../../../../utils/formatter';
import { PriceHighLight } from '../../styles';
import { InstallmentCardContainer, OptionsContainer } from './styles';

interface InstallmentCardProps {
  id: number;
  description: string;
  type: 'INCOME' | 'OUTCOME';
  value: number;
  installmentCategoryId: string;
  createdAt: string;
  isAdmin: boolean;
  date: string;
}

export function InstallmentCard({
  description,
  id,
  installmentCategoryId,
  type,
  value,
  isAdmin,
  date,
}: InstallmentCardProps) {
  return (
    <InstallmentCardContainer>
      <div className="installment-options">
        <span>{description}</span>
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
        <span>{installmentCategoryId}</span>
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
