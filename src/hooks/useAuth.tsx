import { ReactNode, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { User } from '../types/UserType';

interface AuthContexType {
  login: (userData: { token: string; user: User }) => void;
  logout: () => void;
  user: User;
  token: string;
  redirect: (url: string) => void;
}

export const AuthContext = createContext({} as AuthContexType);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage('token', null);
  const navigate = useNavigate();

  function login(userData: { token: string; user: User }) {
    setUser(userData.user);
    setToken(userData.token);
    navigate('/home', { replace: true });
  }

  function logout() {
    setUser(null);
    setToken(null);
    navigate('/auth/login', { replace: true });
  }

  function redirect(url: string) {
    navigate(url);
  }

  return (
    <AuthContext.Provider value={{ login, logout, user, token, redirect }}>
      {children}
    </AuthContext.Provider>
  );
}
