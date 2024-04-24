import { UserCardContainer } from './styles';

interface UserCardProps {
  id: string;
  name: string;
  email: string;
  role: 'DWELLER' | 'ADMIN';
  isActive: boolean;
  residence: string[];
}

export function UserCard({ email, id, isActive, name, role }: UserCardProps) {
  return (
    <UserCardContainer isActive={isActive}>
      <div className="user-info">
        <span>{name}</span>
        <span>{email}</span>
        <span>{role}</span>
      </div>
      <ul>
        <li className="li-on">{isActive ? 'Ativo' : 'Ativar'}</li>
        <li className="li-off">{!isActive ? 'Inativo' : 'Inativar'}</li>
      </ul>
    </UserCardContainer>
  );
}
