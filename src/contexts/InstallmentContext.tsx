import { ReactNode, useEffect, useState, useCallback } from 'react';
import { api } from '../lib/axios';
import { createContext } from 'use-context-selector';

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
  search: string;
  page: string;
  perPage: string;
}

interface InstallmentContextType {
  installments: Installment[];
  installmentCategories: InstallmentCategory[];
  fetchInstallments(query?: QueryParams): Promise<void>;
  createInstallment(data: CreateInstallmentData): Promise<void>;
  handleQueryParams(queryParams: QueryParams): void;
}

export const InstallmentsContext = createContext({} as InstallmentContextType);

export function InstallmentsProvider({ children }: InstallmentsProviderProps) {
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [installmentCategories, setInstallmentCategories] = useState<
    InstallmentCategory[]
  >([]);
  const [params, setParams] = useState({
    search: '',
    page: '1',
    perPage: '10',
  });

  const { page, perPage, search } = params;

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
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!),
        },
        params: {
          search,
          page,
          perPage,
        },
      });

      setInstallments(installments);
    } catch (error) {
      console.log(error);
    }
  }, [page, perPage, search]);

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

  useEffect(() => {
    fetchInstallments();
    fetchInstallmentCategories();
  }, [fetchInstallmentCategories, fetchInstallments]);

  return (
    <InstallmentsContext.Provider
      value={{
        installments,
        installmentCategories,
        fetchInstallments,
        createInstallment,
        handleQueryParams,
      }}
    >
      {children}
    </InstallmentsContext.Provider>
  );
}
