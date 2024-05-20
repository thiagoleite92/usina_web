import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import { SummaryCard, SummaryContainer } from './styles';
import { priceFormatter } from '../../utils/formatter';
import { useSummary } from '../../hooks/useSummary';

export function Summary() {
  const summary = useSummary();

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>
            Entradas
            <ArrowCircleUp size={32} color="#00b37e" />
          </span>
        </header>
        <strong>{priceFormatter.format(summary?.income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>
            Saídas
            <ArrowCircleDown size={32} color="#f75a68" />
          </span>
        </header>
        <strong>{priceFormatter.format(summary?.outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>
            Total
            <CurrencyDollar size={32} color="#fff" />
          </span>
        </header>
        <strong>{priceFormatter.format(summary?.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
