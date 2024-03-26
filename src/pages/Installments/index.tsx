import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { SearchForm } from './components/SearchForm';
import {
  PriceHighLight,
  InstallmentsContainer,
  Installments,
  PencilIcon,
  TrashIcon,
} from './styles';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { useContextSelector } from 'use-context-selector';
import { InstallmentsContext } from '../../contexts/InstallmentContext';
import { AuthContext } from '../../hooks/useAuth';
import { useWindowSize } from '../../hooks/useWindowSize';
import { InstallmentCard } from './components/InstallmentCard';
import { breakpoint } from '../../const/breakpoint';

export function InstallmentsPage() {
  const { installments, installmentCategories } = useContextSelector(
    InstallmentsContext,
    (context) => ({
      installments: context?.installments,
      installmentCategories: context?.installmentCategories,
    })
  );

  console.log(installmentCategories);

  const user = useContextSelector(AuthContext, (context) => context?.user);

  const { width } = useWindowSize();

  return (
    <>
      <Header />
      <Summary />
      <InstallmentsContainer>
        <SearchForm />
        <div style={{ overflowX: 'auto' }}>
          <Installments>
            {width && width >= 680 && (
              <>
                <ul>
                  {installments?.map((installment) => {
                    return (
                      <li key={installment?.id}>
                        <div>
                          {
                            installmentCategories.find(
                              (category) =>
                                category.id ===
                                installment?.installmentCategoryId
                            )?.installmentCategory
                          }
                        </div>
                        <div>
                          <PriceHighLight variant={installment?.type}>
                            {installment?.type === 'OUTCOME' && '-'}
                            {priceFormatter.format(installment?.value / 100)}
                          </PriceHighLight>
                        </div>
                        <div>{installment?.description}</div>
                        <div>
                          {dateFormatter({
                            month: 'short',
                            year: 'numeric',
                          }).format(new Date(installment?.date))}
                        </div>
                        {user?.role === 'ADMIN' && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-around',
                              gap: '8px',
                            }}
                          >
                            <PencilIcon size={20} />
                            <TrashIcon size={20} />
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </Installments>
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
