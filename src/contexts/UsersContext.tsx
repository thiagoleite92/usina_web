import { ReactNode, useEffect, useState, useCallback } from 'react';
import { api } from '../lib/axios';
import { createContext, useContextSelector } from 'use-context-selector';
import { AuthContext } from '../hooks/useAuth';
import { User } from '../types/UserType';
import { Toast } from '../lib/toast';

interface UsersProviderProps {
  children: ReactNode;
}

interface UsersContextType {
  users: User[];
  handleUserStatus: (userId: string) => void;
  handleUserRole: (userId: string) => void;
}

export const UsersContext = createContext({} as UsersContextType);

export function UsersProvider({ children }: UsersProviderProps) {
  const user = useContextSelector(AuthContext, (context) => {
    return context.user;
  });

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    const { data } = await api.get('/user/all', {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!),
      },
    });

    setUsers(data?.users);
  }, []);

  useEffect(() => {
    if (!user || !user.isActive) {
      return;
    }
    fetchUsers();
  }, [fetchUsers, user]);

  const handleUserStatus = async (userId: string) => {
    try {
      await api.patch(`/user/${userId}/status`, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!),
        },
      });

      setUsers((oldState: User[]) => {
        const newState = oldState.slice();
        const existingUser = newState.find((user) => user?.id === userId);

        if (existingUser) {
          existingUser.isActive = !existingUser.isActive;
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

  const handleUserRole = async (userId: string) => {
    try {
      await api.patch(`/user/${userId}/role`, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!),
        },
      });

      setUsers((oldState: User[]) => {
        const newState = oldState.slice();
        const existingUser = newState.find((user) => user?.id === userId);

        if (existingUser) {
          existingUser.role =
            existingUser.role === 'ADMIN' ? 'DWELLER' : 'ADMIN';
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
    <UsersContext.Provider value={{ users, handleUserStatus, handleUserRole }}>
      {children}
    </UsersContext.Provider>
  );
}
