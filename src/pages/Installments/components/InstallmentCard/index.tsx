import { Pencil, TrashSimple } from 'phosphor-react';
import { dateFormatter, priceFormatter } from '../../../../utils/formatter';
import { PriceHighLight } from '../../styles';
import { InstallmentCardContainer, OptionsContainer } from './styles';

interface InstallmentCardProps {
  id: number;
  description: string;
  type: 'INCOME' | 'OUTCOME';
  value: number;
  installment: string;
  createdAt: string;
  isAdmin: boolean;
}

export function InstallmentCard({
  createdAt,
  description,
  id,
  installment,
  type,
  value,
  isAdmin,
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
        <span>{installment}</span>
        <span>{dateFormatter.format(new Date(createdAt))}</span>
      </div>
    </InstallmentCardContainer>
  );
}
