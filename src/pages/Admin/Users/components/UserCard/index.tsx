import { UnitSelect } from '../../../../../components/Select';
import { RoleEnum } from '../../../../../enums/RoleEnum';
import { UserCardContainer } from './styles';

interface UserCardProps {
  id: string;
  name: string;
  email: string;
  role: 'DWELLER' | 'ADMIN';
  isActive: boolean;
  residence: string[];
  handleUserStatus: (userId: string) => void;
  handleUserRole: (userId: string) => void;
}

export function UserCard({
  email,
  id,
  isActive,
  name,
  role,
  residence,
  handleUserStatus,
  handleUserRole,
}: UserCardProps) {
  return (
    <UserCardContainer isActive={isActive}>
      <div className="user-info">
        <span>Nome: {name}</span>
        <span>Email: {email}</span>
        <span>
          {residence[0]} - {residence[1]}
        </span>

        <UnitSelect
          options={[
            { label: 'Residente', value: 'DWELLER' },
            { label: 'Síndico', value: 'ADMIN' },
          ]}
          placeholder="Selecione Atribuição"
          onChange={() => {
            handleUserRole(id);
          }}
          defaultValue={{
            label: RoleEnum[role],
            value: role,
          }}
        />
      </div>
      <ul>
        <li onClick={() => handleUserStatus(id)} className="li-on">
          {isActive ? 'Ativo' : 'Ativar'}
        </li>
        <li onClick={() => handleUserStatus(id)} className="li-off">
          {!isActive ? 'Inativo' : 'Inativar'}
        </li>
      </ul>
    </UserCardContainer>
  );
}
