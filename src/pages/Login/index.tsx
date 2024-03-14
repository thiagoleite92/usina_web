import { z } from 'zod';
import { LoginContainer, LoginForm } from './styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../lib/axios';
import { Auth } from '../../types/AuthType';
import { AxiosAuthResponse } from '../../types/AxiosAuthResponse';
import { useEffect } from 'react';
import { AuthContext } from '../../hooks/useAuth';
import { useContextSelector } from 'use-context-selector';
import { useNavigate } from 'react-router-dom';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginFormType = z.infer<typeof loginFormSchema>;

export function Login() {
  const { login, user } = useContextSelector(AuthContext, (context) => ({
    login: context.login,
    user: context.user,
  }));

  const navigate = useNavigate();

  useEffect(() => {
    if (user) return navigate('/home');
  }, [navigate, user]);

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  async function handleLogin(data: LoginFormType) {
    const { email, password } = data;

    try {
      const { data } = (await api.post('/auth', { email, password })) as Auth;

      if (data?.access_token) {
        const response = (await api.get('/user/me', {
          headers: { Authorization: 'Bearer ' + data?.access_token },
        })) as AxiosAuthResponse;

        if (response) {
          login({
            token: data?.access_token,
            user: { ...response?.data?.user },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (user) {
    return;
  }

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit(handleLogin)}>
        <input type="text" placeholder="E-mail" {...register('email')} />
        <input type="password" placeholder="Senha" {...register('password')} />
        <button type="submit" disabled={isSubmitting}>
          Logar
        </button>
      </LoginForm>
    </LoginContainer>
  );
}
