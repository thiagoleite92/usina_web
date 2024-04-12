import { z } from 'zod';
import {
  NewAccountContainer,
  RegisterContainer,
  RegisterForm,
  ResidenceContainer,
} from './styles';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../lib/axios';
import { useEffect, useState } from 'react';
import { AuthContext } from '../../hooks/useAuth';
import { useContextSelector } from 'use-context-selector';
import { Link, useNavigate } from 'react-router-dom';
import { UnitSelect } from '../../components/Select';
import { blocks } from '../../const/blocks';
import { useWindowSize } from '../../hooks/useWindowSize';

const registerFormSchema = z
  .object({
    name: z
      .string({
        required_error: 'Insira seu Nome',
      })
      .min(3, { message: 'Mínimo 3 caracteres' })
      .max(50, { message: 'Máximo 50 caracteres' }),
    email: z
      .string({ required_error: 'Insira seu E-mail' })
      .email({ message: 'E-mail inválido' })
      .min(3, { message: 'Mínimo 3 caracteres' })
      .max(50, { message: 'Máximo 50 caracteres' }),
    password: z
      .string({ required_error: 'Insira a senha' })
      .min(1, { message: 'Insira a senha' }),
    confirmPassword: z.string({
      required_error: 'Insira confirmação de senha',
    }),
    residence: z.object({
      bloco: z.object({
        label: z.string({ required_error: 'Selecione o Bloco' }),
        value: z.string({ required_error: 'Selecione o Bloco' }),
      }),
      apto: z.string({ required_error: 'Digite o apartamento' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
  });

type RegisterFormType = z.infer<typeof registerFormSchema>;

export function Register() {
  const { width } = useWindowSize();

  const { user } = useContextSelector(AuthContext, (context) => ({
    login: context.login,
    user: context.user,
    handleSaveToken: context.handleSaveToken,
  }));

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (user) return navigate('/home');
  }, [navigate, user]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      residence: { apto: '', bloco: { label: '', value: '' } },
    },
  });

  async function handleLogin(data: RegisterFormType) {
    const { email, password, name, residence } = data;

    try {
      const { data } = await api.post('/user', {
        email,
        password,
        name,
        residence,
      });
    } catch (error: unknown) {
      setErrorMessage(error?.response?.data?.message);
    }
  }

  if (user) {
    return;
  }

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleSubmit(handleLogin)} width={width ?? NaN}>
        <h2>Cadastro</h2>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <>
              <input
                type="text"
                placeholder="Seu Nome"
                onChange={field.onChange}
                value={field.value}
                defaultValue=""
                onFocus={() => setErrorMessage('')}
              />
              {errors?.name && (
                <span className="input-warning">{errors?.name?.message}</span>
              )}
            </>
          )}
        />
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
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <>
              <input
                defaultValue=""
                type="password"
                placeholder="Confirmar Senha"
                onChange={field.onChange}
                value={field.value}
              />

              {errors?.confirmPassword && (
                <span className="input-warning">
                  {errors?.confirmPassword?.message}
                </span>
              )}
            </>
          )}
        />
        <ResidenceContainer>
          <Controller
            control={control}
            name="residence.bloco"
            render={({ field }) => (
              <div className="residence-bloco-select">
                <UnitSelect
                  placeholder="Selecione Bloco"
                  onChange={field.onChange}
                  options={blocks}
                />
                {errors?.residence?.bloco && (
                  <span className="input-warning">
                    {errors?.residence?.bloco.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="residence.apto"
            render={({ field }) => (
              <div className="residence-apto-input">
                <input
                  placeholder="Número do Apto"
                  onChange={field.onChange}
                  value={field.value}
                  className="input-apto"
                  minLength={3}
                  maxLength={3}
                />
                {errors?.residence?.apto && (
                  <span className="input-warning">
                    {errors?.residence?.apto.message}
                  </span>
                )}
              </div>
            )}
          />
        </ResidenceContainer>
        <button type="submit" disabled={isSubmitting}>
          Cadastrar
        </button>
        {errorMessage && <span className="login-warning">{errorMessage}</span>}
        <hr />
        <NewAccountContainer>
          <span>Já possui conta?</span>
          <Link to="/auth/login" className="link-register">
            Clique para fazer login
          </Link>
        </NewAccountContainer>
      </RegisterForm>
    </RegisterContainer>
  );
}
