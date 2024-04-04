import * as Dialog from '@radix-ui/react-dialog';

import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { SearchForm } from './components/SearchForm';
import {
  PriceHighLight,
  InstallmentsContainer,
  InstallmentsTable,
  OptionsContainer,
} from './styles';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { useContextSelector } from 'use-context-selector';
import { InstallmentsContext } from '../../contexts/InstallmentContext';
import { AuthContext } from '../../hooks/useAuth';
import { useWindowSize } from '../../hooks/useWindowSize';
import { InstallmentCard } from './components/InstallmentCard';
import { breakpoint } from '../../const/breakpoint';
import { columnHeads } from '../../const/columnsHead';
import { Pencil, Trash } from 'phosphor-react';
import { Content, Overlay } from '../../components/FormInstallment/styles';
import { DeleteInstallment } from '../../components/DeleteInstallment';
import { FormInstallment } from '../../components/FormInstallment';

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
                            <OptionsContainer>
                              <Dialog.Root>
                                <Dialog.Trigger asChild>
                                  <Pencil size={24} />
                                </Dialog.Trigger>
                                <Dialog.Portal>
                                  <FormInstallment {...installment} />
                                </Dialog.Portal>
                              </Dialog.Root>
                              <Dialog.Root>
                                <Overlay />
                                <Dialog.Trigger asChild>
                                  <Trash size={24} />
                                </Dialog.Trigger>
                                <Dialog.Portal>
                                  <Content width={width}>
                                    <DeleteInstallment
                                      installmentId={installment?.id}
                                    />
                                  </Content>
                                </Dialog.Portal>
                              </Dialog.Root>
                            </OptionsContainer>
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
                  installmentCategories={installmentCategories}
                />
              );
            })}
          </>
        )}
      </InstallmentsContainer>
    </>
  );
}
