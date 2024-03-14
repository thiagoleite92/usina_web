import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { SearchForm } from './components/SearchForm';
import {
  PriceHighLight,
  InstallmentsContainer,
  InstallmentsTable,
  GearIcon,
} from './styles';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { useContextSelector } from 'use-context-selector';
import { InstallmentsContext } from '../../contexts/InstallmentContext';
import { AuthContext } from '../../hooks/useAuth';

export function Installments() {
  const installments = useContextSelector(
    InstallmentsContext,
    (context) => context?.installments
  );

  const user = useContextSelector(AuthContext, (context) => context?.user);

  console.log(user);

  return (
    <div>
      <Header />
      <Summary />
      <InstallmentsContainer>
        <SearchForm />
        <InstallmentsTable>
          <tbody>
            {installments?.map((installment) => {
              return (
                <tr key={installment?.id}>
                  <td width="50%">{installment?.description}</td>
                  <td>
                    <PriceHighLight variant={installment?.type}>
                      {installment?.type === 'OUTCOME' && '-'}
                      {priceFormatter.format(installment?.value / 100)}
                    </PriceHighLight>
                  </td>
                  <td>{installment?.installment}</td>
                  <td>
                    {dateFormatter.format(new Date(installment?.createdAt))}
                  </td>
                  {user?.role === 'ADMIN' && (
                    <td>
                      <GearIcon size={20} />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </InstallmentsTable>
      </InstallmentsContainer>
    </div>
  );
}
