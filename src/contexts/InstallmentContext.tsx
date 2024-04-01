import { ReactNode, useEffect, useState, useCallback } from 'react';
import { api } from '../lib/axios';
import { createContext, useContextSelector } from 'use-context-selector';
import { AuthContext } from '../hooks/useAuth';
import { useInitialPeriod } from '../hooks/useInitialPeriod';
import { parseSelectAvailabePeriods } from '../utils/parseSelectAvailablePeriods';

interface InstallmentsProviderProps {
  children: ReactNode;
}

export interface Installment {
  id: number;
  description: string;
  type: 'INCOME' | 'OUTCOME';
  value: number;
  installmentCategoryId: string;
  date: string;
  createdAt: string;
}

interface InstallmentCategory {
  id: string;
  installmentCategory: string;
}

interface CreateInstallmentData {
  description?: string;
  value: string;
  installmentCategoryId: string;
  type: 'INCOME' | 'OUTCOME';
  date: Date;
}

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
  handleQueryParams(queryParams: QueryParams): void;
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

  const createInstallment = useCallback(async (data: CreateInstallmentData) => {
    const { installmentCategoryId, description, value, type, date } = data;

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
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!),
        },
      }
    );

    const newInstallment = response?.data?.installment as Installment;

    setInstallments((oldState: Installment[]) => [newInstallment, ...oldState]);
  }, []);

  const fetchInstallmentsPeriodsAvailable = useCallback(async () => {
    const response = await api.get(
      '/installment/periods-available',

      {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!),
        },
      }
    );

    const teste = parseSelectAvailabePeriods(response?.data?.availablePeriods);

    setPeriodsAvailable(teste);
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchInstallments();
  }, [fetchInstallments, user]);

  useEffect(() => {
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
      }}
    >
      {children}
    </InstallmentsContext.Provider>
  );
}
