import { ReactNode, useEffect, useState, useCallback } from 'react';
import { api } from '../lib/axios';
import { createContext, useContextSelector } from 'use-context-selector';
import { AuthContext } from '../hooks/useAuth';
import { User } from '../types/UserType';
import { Toast } from '../lib/toast';

interface ResidentsProviderProps {
  children: ReactNode;
}

interface ResidentsContextType {
  residents: User[];
  handleUserStatus: (residentId: string) => void;
  handleUserRole: (residentId: string) => void;
}

export const ResidentsContext = createContext({} as ResidentsContextType);

export function ResidentsProvider({ children }: ResidentsProviderProps) {
  const user = useContextSelector(AuthContext, (context) => {
    return context.user;
  });

  const [residents, setResidents] = useState<User[]>([]);

  const fetchResidents = useCallback(async () => {
    const { data } = await api.get('/user/all', {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!),
      },
    });

    setResidents(data?.users);
  }, []);

  useEffect(() => {
    if (!user || !user.isActive) {
      return;
    }
    fetchResidents();
  }, [fetchResidents, user]);

  const handleUserStatus = async (userId: string) => {
    try {
      await api.patch(`/user/${userId}/status`, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!),
        },
      });

      setResidents((oldState: User[]) => {
        const newState = oldState.slice();
        const existingResident = newState.find(
          (resident) => resident?.id === userId
        );

        if (existingResident) {
          existingResident.isActive = !existingResident.isActive;
        }

        return newState;
      });

      Toast(`Status atualizado.`, 'success', {
        position: 'bottom-right',
      });
    } catch (error) {
      console.log(error);
      Toast(`Ocorreu um erro. Tente novamente`, 'error', {
        position: 'bottom-right',
      });
    }
  };

  const handleUserRole = async (residentId: string) => {
    try {
      // await api.patch(`/user/${residentId}/role`, {
      //   headers: {
      //     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!),
      //   },
      // });

      setResidents((oldState: User[]) => {
        const newState = oldState.slice();
        const existingResident = newState.find(
          (resident) => resident?.id === residentId
        );

        if (existingResident) {
          existingResident.role =
            existingResident.role === 'ADMIN' ? 'DWELLER' : 'ADMIN';
        }

        return newState;
      });

      Toast(`Atribuição atualizada.`, 'success', {
        position: 'bottom-right',
      });
    } catch (error) {
      console.log(error);
      Toast(`Ocorreu um erro. Tente novamente`, 'error', {
        position: 'bottom-right',
      });
    }
  };

  return (
    <ResidentsContext.Provider
      value={{ residents, handleUserStatus, handleUserRole }}
    >
      {children}
    </ResidentsContext.Provider>
  );
}
