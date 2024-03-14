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
import { useWindowSize } from '../../hooks/useWindowSize';
import { InstallmentCard } from './components/InstallmentCard';

export function Installments() {
  const installments = useContextSelector(
    InstallmentsContext,
    (context) => context?.installments
  );

  const user = useContextSelector(AuthContext, (context) => context?.user);

  const { width } = useWindowSize();

  return (
    <>
      <Header />
      <Summary />
      <InstallmentsContainer>
        <SearchForm />
        <div style={{ overflowX: 'auto' }}>
          <InstallmentsTable>
            {width && width >= 680 && (
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
            )}
          </InstallmentsTable>
        </div>
        {width && width < 680 && (
          <>
            {installments?.map((installment) => {
              return (
                <InstallmentCard
                  {...installment}
                  key={installment.id}
                  isAdmin={user.role === 'ADMIN'}
                />
              );
            })}
          </>
        )}
      </InstallmentsContainer>
    </>
  );
}
