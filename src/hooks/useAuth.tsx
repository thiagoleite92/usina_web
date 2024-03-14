import { ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { User } from '../types/UserType';
import { createContext } from 'use-context-selector';

interface AuthContexType {
  login: (userData: { token: string; user: User }) => void;
  logout: () => void;
  user: User;
  token: string;
}

export const AuthContext = createContext({} as AuthContexType);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage('token', null);
  const navigate = useNavigate();

  const login = useCallback(
    (userData: { token: string; user: User }) => {
      setUser(userData.user);
      setToken(userData.token);
      navigate('/home', { replace: true });
    },
    [navigate, setToken, setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    navigate('/auth/login', { replace: true });
  }, [navigate, setToken, setUser]);

  return (
    <AuthContext.Provider value={{ login, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  );
}
