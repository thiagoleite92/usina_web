import { ReactNode, useEffect, useState, useCallback } from 'react';
import { api } from '../lib/axios';
import { createContext, useContextSelector } from 'use-context-selector';
import { AuthContext } from '../hooks/useAuth';
import { User } from '../types/UserType';

interface ResidentsProviderProps {
  children: ReactNode;
}

interface ResidentsContextType {
  residents: User[];
  handleResidentsStatus: (residentId: string) => void;
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

  const handleResidentsStatus = async (residentId: string) => {
    try {
      await api.patch(`/user/${residentId}/status`, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!),
        },
      });

      setResidents((oldState: User[]) => {
        const newState = oldState.slice();
        const existingResident = newState.find(
          (resident) => resident?.id === residentId
        );

        if (existingResident) {
          existingResident.isActive = !existingResident.isActive;
        }

        return newState;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ResidentsContext.Provider value={{ residents, handleResidentsStatus }}>
      {children}
    </ResidentsContext.Provider>
  );
}
