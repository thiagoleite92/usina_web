import { z } from 'zod';
import { LoginContainer, LoginForm, NewAccountContainer } from './styles';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../lib/axios';
import { Auth } from '../../types/AuthType';
import { AxiosAuthResponse } from '../../types/AxiosAuthResponse';
import { useEffect, useState } from 'react';
import { AuthContext } from '../../hooks/useAuth';
import { useContextSelector } from 'use-context-selector';
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from '../../lib/toast';

const loginFormSchema = z.object({
  email: z
    .string({ required_error: 'Insira seu E-mail' })
    .email({ message: 'E-mail inválido' })
    .min(3)
    .max(50),
  password: z
    .string({ required_error: 'Insira a senha' })
    .min(1, { message: 'Insira a senha' }),
});

type LoginFormType = z.infer<typeof loginFormSchema>;

export function Login() {
  const { login, user, handleSaveToken } = useContextSelector(
    AuthContext,
    (context) => ({
      login: context.login,
      user: context.user,
      handleSaveToken: context.handleSaveToken,
    })
  );

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (user) return navigate('/home');
  }, [navigate, user]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handleLogin(data: LoginFormType) {
    const { email, password } = data;

    try {
      const { data } = (await api.post('/auth', { email, password })) as Auth;
      handleSaveToken(data?.access_token);

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
    } catch (error: unknown) {
      Toast(error?.response?.data?.message, 'error');
    }
  }

  if (user) {
    return;
  }

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit(handleLogin)}>
        <h2>Login</h2>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <>
              <input
                type="email"
                placeholder="E-mail"
                onChange={field.onChange}
                value={field.value}
                defaultValue=""
                onFocus={() => setErrorMessage('')}
              />
              {errors?.email && (
                <span className="input-warning">{errors?.email?.message}</span>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <>
              <input
                defaultValue=""
                type="password"
                placeholder="Senha"
                onChange={field.onChange}
                value={field.value}
              />
              {errors?.password && (
                <span className="input-warning">
                  {errors?.password?.message}
                </span>
              )}
            </>
          )}
        />

        <button type="submit" disabled={isSubmitting}>
          Logar
        </button>
        {errorMessage && <span className="login-warning">{errorMessage}</span>}
        <hr />
        <NewAccountContainer>
          <span>Ainda não possui cadastro?</span>
          <Link to="/auth/cadastro" className="link-register">
            Clique para fazer cadastro
          </Link>
        </NewAccountContainer>
      </LoginForm>
    </LoginContainer>
  );
}
