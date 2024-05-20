import { useMemo } from 'react';
import { useContextSelector } from 'use-context-selector';
import { InstallmentsContext } from '../contexts/InstallmentContext';

export function useSummary() {
  const installments = useContextSelector(
    InstallmentsContext,
    (context) => context.installments
  );

  const summary = useMemo(() => {
    return installments?.reduce(
      (acc, installment) => {
        if (installment.type === 'INCOME') {
          acc.income += installment.value / 100;
          acc.total += installment.value / 100;
        } else {
          acc.outcome += installment.value / 100;
          acc.total -= installment.value / 100;
        }

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    );
  }, [installments]);

  return summary;
}
