import { ReactNode, useEffect, useState, useCallback } from 'react';
import { api } from '../lib/axios';
import { createContext, useContextSelector } from 'use-context-selector';
import { AuthContext } from '../hooks/useAuth';
import { useInitialPeriod } from '../hooks/useInitialPeriod';
import { parseSelectAvailabePeriods } from '../utils/parseSelectAvailablePeriods';
import dayjs from 'dayjs';

interface InstallmentsProviderProps {
  children: ReactNode;
}

export interface Installment {
  id: string;
  description: string;
  type: 'INCOME' | 'OUTCOME';
  value: number;
  installmentCategoryId: string;
  date: string;
  createdAt: string;
}

export interface InstallmentCategory {
  id: string;
  installmentCategory: string;
}

type CreateInstallmentData = {
  description?: string;
  value: string;
  installmentCategoryId: string;
  type: 'INCOME' | 'OUTCOME';
  date: Date;
};

type EditInstallmentData = CreateInstallmentData & { id: string };

interface QueryParams {
  page: string;
  perPage: string;
  period: string[];
}

interface InstallmentContextType {
  installments: Installment[];
  installmentCategories: InstallmentCategory[];
  periodsAvailable: { label: string; value: string[] }[];
  fetchInstallments(query?: QueryParams): Promise<void>;
  createInstallment(data: CreateInstallmentData): Promise<void>;
  editInstallment(data: EditInstallmentData): Promise<void>;
  handleQueryParams(queryParams: QueryParams): void;
  deleteInstallment: (installmentId: string) => void;
}

export const InstallmentsContext = createContext({} as InstallmentContextType);

export function InstallmentsProvider({ children }: InstallmentsProviderProps) {
  const user = useContextSelector(AuthContext, (context) => {
    return context.user;
  });
  const initialPeriod = useInitialPeriod();

  const [installments, setInstallments] = useState<Installment[]>([]);

  const [installmentCategories, setInstallmentCategories] = useState<
    InstallmentCategory[]
  >([]);

  const [params, setParams] = useState({
    page: '1',
    perPage: '10',
    period: initialPeriod,
  });

  const [periodsAvailable, setPeriodsAvailable] = useState<
    { label: string; value: string[] }[]
  >([]);

  const { page, perPage, period } = params;

  const handleQueryParams = (queryParams: QueryParams) => {
    setParams((oldState) => ({
      ...oldState,
      ...queryParams,
    }));
  };

  const fetchInstallments = useCallback(async () => {
    try {
      const {
        data: { installments },
      } = await api.get('/installment', {
        params: {
          page,
          perPage,
          monthFilter: period,
        },
      });

      setInstallments(installments);
    } catch (error) {
      console.log(error);
    }
  }, [page, perPage, period]);

  const fetchInstallmentCategories = useCallback(async () => {
    try {
      const { data: installmentCategories } = await api.get(
        '/installment/categories',
        {
          headers: {
            Authorization:
              'Bearer ' + JSON.parse(localStorage.getItem('token')!),
          },
        }
      );

      setInstallmentCategories(installmentCategories.installmentCategories);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const editInstallment = useCallback(
    async (data: EditInstallmentData) => {
      const { installmentCategoryId, description, value, type, date, id } =
        data;

      const dateAndPeriodAreTheSame =
        dayjs(date).format('MM/YYYY') === dayjs(period[0]).format('MM/YYYY');

      const existingCategory = installmentCategories.some(
        (category) => category.installmentCategory === installmentCategoryId
      );

      try {
        await api.put(
          `/installment/${id}`,
          {
            description,
            installmentCategoryId,
            value: Number(value.replace(/\D/g, '')),
            type: type.toLocaleUpperCase(),
            date,
          },
          {
            headers: {
              Authorization:
                'Bearer ' + JSON.parse(localStorage.getItem('token')!),
            },
          }
        );

        if (dateAndPeriodAreTheSame) {
          setInstallments((oldState: Installment[]) => {
            const saveState = oldState.slice();

            const existingInstallment = saveState.find(
              (installment) => installment.id === id
            );

            if (existingInstallment) {
              existingInstallment.date = date.toISOString();
              existingInstallment.value = Number(value.replace(/\D/g, ''));
              existingInstallment.type = type;
              existingInstallment.installmentCategoryId = installmentCategoryId;
              existingInstallment.description = description ?? '';
            }

            return saveState;
          });
        } else {
          setInstallments((oldState: Installment[]) =>
            oldState.filter((installment) => installment.id !== id)
          );
        }

        if (!existingCategory) {
          setInstallmentCategories((oldState: InstallmentCategory[]) => {
            const saveState = oldState.slice();

            saveState.push({
              id: installmentCategoryId,
              installmentCategory: installmentCategoryId,
            });

            return saveState;
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [installmentCategories, period]
  );

  const createInstallment = useCallback(
    async (data: CreateInstallmentData) => {
      const { installmentCategoryId, description, value, type, date } = data;

      const dateAndPeriodAreTheSame =
        dayjs(date).format('MM/YYYY') === dayjs(period[0]).format('MM/YYYY');

      const existingPeriod = periodsAvailable.some(
        (period) =>
          period?.label ===
          `${dayjs()
            .month(new Date(date).getMonth())
            .format('MMMM')}/${new Date(date).getFullYear()}`
      );

      const existingCategory = installmentCategories.some(
        (category) => category.installmentCategory === installmentCategoryId
      );

      try {
        const response = await api.post(
          '/installment',
          {
            description,
            installmentCategoryId,
            value: Number(value.replace(/\D/g, '')),
            type: type.toLocaleUpperCase(),
            date,
          },
          {
            headers: {
              Authorization:
                'Bearer ' + JSON.parse(localStorage.getItem('token')!),
            },
          }
        );

        const newInstallment = response?.data?.installment as Installment;

        if (dateAndPeriodAreTheSame) {
          setInstallments((oldState: Installment[]) => [
            { ...newInstallment, installmentCategoryId },
            ...oldState,
          ]);
        }

        if (!existingCategory) {
          setInstallmentCategories((oldState: InstallmentCategory[]) => {
            const saveState = oldState.slice();

            saveState.push({
              id: installmentCategoryId,
              installmentCategory: installmentCategoryId,
            });

            return saveState;
          });
        }

        if (!existingPeriod) {
          setPeriodsAvailable(
            (oldState: { label: string; value: string[] }[]) => {
              const saveState = oldState.slice();

              const [year, month] = new Date(date)
                .toISOString()
                ?.split('-') || ['', ''];

              const parseMonth = parseInt(month) - 1;

              saveState.push({
                label: `${dayjs().month(parseMonth).format('MMMM')}/${year}`,
                value: [
                  `${year}-${month}-01`,
                  `${year}-${month}-${dayjs(
                    `${year}-${month}-01`
                  ).daysInMonth()}`,
                ],
              });

              return saveState;
            }
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    [installmentCategories, period, periodsAvailable]
  );

  const fetchInstallmentsPeriodsAvailable = useCallback(async () => {
    const response = await api.get('/installment/periods-available', {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!),
      },
    });

    const parsedAvailablePeriods = parseSelectAvailabePeriods(
      response?.data?.availablePeriods
    );

    setPeriodsAvailable(parsedAvailablePeriods);
  }, []);

  const deleteInstallment = (installmentId: string) => {
    setInstallments((oldState) =>
      oldState.filter((installment) => installment?.id !== installmentId)
    );
  };

  useEffect(() => {
    if (!user || !user?.isActive) return;
    fetchInstallments();
  }, [fetchInstallments, user]);

  useEffect(() => {
    if (!user || !user?.isActive) return;
    fetchInstallmentCategories();
    fetchInstallmentsPeriodsAvailable();
  }, [fetchInstallmentCategories, fetchInstallmentsPeriodsAvailable, user]);

  return (
    <InstallmentsContext.Provider
      value={{
        installments,
        installmentCategories,
        fetchInstallments,
        createInstallment,
        handleQueryParams,
        periodsAvailable,
        deleteInstallment,
        editInstallment,
      }}
    >
      {children}
    </InstallmentsContext.Provider>
  );
}
