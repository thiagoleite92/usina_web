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
  installment: string;
  createdAt: string;
}

interface CreateInstallmentData {
  description: string;
  value: string;
  installment: string;
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
  fetchInstallments(query?: QueryParams): Promise<void>;
  createInstallment(data: CreateInstallmentData): Promise<void>;
  handleQueryParams(queryParams: QueryParams): void;
}

export const InstallmentsContext = createContext({} as InstallmentContextType);

export function InstallmentsProvider({ children }: InstallmentsProviderProps) {
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [params, setParams] = useState({
    search: '',
    page: '1',
    perPage: '10',
  });

  const { page, perPage, search } = params;

  const handleQueryParams = (queryParams: QueryParams) => {
    console.log(queryParams);
    setParams((oldState) => ({
      ...oldState,
      ...queryParams,
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchInstallments = useCallback(async () => {
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
  }, [page, perPage, search]);

  const createInstallment = useCallback(async (data: CreateInstallmentData) => {
    const { installment, description, value, type, date } = data;

    const response = await api.post(
      '/installment',
      {
        description,
        installment,
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
  }, [fetchInstallments]);

  return (
    <InstallmentsContext.Provider
      value={{
        installments,
        fetchInstallments,
        createInstallment,
        handleQueryParams,
      }}
    >
      {children}
    </InstallmentsContext.Provider>
  );
}
