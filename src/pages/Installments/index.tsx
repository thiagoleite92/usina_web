import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { SearchForm } from './components/SearchForm';
import {
  PriceHighLight,
  InstallmentsContainer,
  PencilIcon,
  TrashIcon,
  InstallmentsTable,
} from './styles';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { useContextSelector } from 'use-context-selector';
import { InstallmentsContext } from '../../contexts/InstallmentContext';
import { AuthContext } from '../../hooks/useAuth';
import { useWindowSize } from '../../hooks/useWindowSize';
import { InstallmentCard } from './components/InstallmentCard';
import { breakpoint } from '../../const/breakpoint';
import { columnHeads } from '../../const/columnsHead';

export function InstallmentsPage() {
  const { installments, installmentCategories } = useContextSelector(
    InstallmentsContext,
    (context) => ({
      installments: context?.installments,
      installmentCategories: context?.installmentCategories,
    })
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
              <>
                <thead>
                  <tr>
                    {columnHeads.map((head) => (
                      <th key={head}>{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {installments?.map((installment) => {
                    return (
                      <tr key={installment?.id}>
                        <td>
                          {
                            installmentCategories.find(
                              (category) =>
                                category.id ===
                                installment?.installmentCategoryId
                            )?.installmentCategory
                          }
                        </td>
                        <td>
                          <PriceHighLight variant={installment?.type}>
                            {installment?.type === 'OUTCOME' && '-'}
                            {priceFormatter.format(installment?.value / 100)}
                          </PriceHighLight>
                        </td>
                        <td>{installment?.description}</td>
                        <td>
                          {dateFormatter({
                            month: 'short',
                            year: 'numeric',
                          }).format(new Date(installment?.date))}
                        </td>
                        {user?.role === 'ADMIN' && (
                          <td
                            style={{
                              display: 'flex',
                              justifyContent: 'space-around',
                              gap: '8px',
                            }}
                          >
                            <PencilIcon size={20} />
                            <TrashIcon size={20} />
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </>
            )}
          </InstallmentsTable>
        </div>
        {width && width < breakpoint && (
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
