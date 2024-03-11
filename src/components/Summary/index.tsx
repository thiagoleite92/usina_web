import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import { SummaryCard, SummaryContainer } from './styles';

export function Summary() {
  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>
            Entradas
            <ArrowCircleUp size={32} color="#00b37e" />
          </span>
        </header>
        <strong>montante</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>
            Saídas
            <ArrowCircleDown size={32} color="#f75a68" />
          </span>
        </header>
        <strong>montante</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>
            Total
            <CurrencyDollar size={32} color="#fff" />
          </span>
        </header>
        <strong>montante</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
