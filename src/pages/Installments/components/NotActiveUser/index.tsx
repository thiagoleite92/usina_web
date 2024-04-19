import { SignOut, WhatsappLogo } from 'phosphor-react';
import { NotActiveUserContainer } from './styles';
import { User } from '../../../../types/UserType';
import { AuthContext } from '../../../../hooks/useAuth';
import { useContextSelector } from 'use-context-selector';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { Link } from 'react-router-dom';

interface NotActiveUserProps {
  user: User;
}
export function NotActiveUser({ user }: NotActiveUserProps) {
  const { width } = useWindowSize();

  const logout = useContextSelector(AuthContext, (context) => context.logout);

  const link = `https://api.whatsapp.com/send?phone=${
    import.meta.env.VITE_ADMIN_ZAP
  }&text=Olá, meu nome é ${user.name} morador(a) do Bloco ${
    user?.residence[0]
  } - Apto ${user?.residence[1]}. Gostaria que minha conta fosse ativada.`;

  return (
    <NotActiveUserContainer width={width}>
      <h3>Status</h3>
      <p>Perfil Inativo</p>
      <hr />
      <div>
        Entre em contato com o administrador
        <Link to={link} target="_blank">
          <WhatsappLogo size={32} />
        </Link>
      </div>
      <hr />
      <button onClick={logout}>
        Sair <SignOut size={24} />
      </button>
    </NotActiveUserContainer>
  );
}
