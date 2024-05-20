import * as Switch from '@radix-ui/react-switch';
import { useContextSelector } from 'use-context-selector';
import { UsersContext } from '../../../contexts/UsersContext';
import { UsersContainer, UsersTable, TitleContainer } from './styles';
import { columnHeadsUsers } from '../../../const/columnsHeads';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { breakpoint } from '../../../const/breakpoint';
import { UnitSelect } from '../../../components/Select';
import { RoleEnum } from '../../../enums/RoleEnum';
import { UserCard } from './components/UserCard';

export function UsersPage() {
  const { users, handleUserStatus, handleUserRole } = useContextSelector(
    UsersContext,
    ({ users, handleUserStatus, handleUserRole }) => ({
      users,
      handleUserStatus,
      handleUserRole,
    })
  );

  const { width } = useWindowSize();

  return (
    <UsersContainer>
      <TitleContainer>
        <h3>MORADORES</h3>
      </TitleContainer>
      <div>
        <UsersTable>
          {width && width >= breakpoint && (
            <>
              <thead>
                <tr>
                  {columnHeadsUsers.map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user?.id}>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>
                      <UnitSelect
                        options={[
                          { label: 'Residente', value: 'DWELLER' },
                          { label: 'Síndico', value: 'ADMIN' },
                        ]}
                        placeholder="Selecione Atribuição"
                        onChange={() => {
                          handleUserRole(user?.id);
                        }}
                        defaultValue={{
                          label: RoleEnum[user.role],
                          value: user?.role,
                        }}
                      />
                    </td>
                    <td>
                      {user?.residence[0]?.toUpperCase()} - {user?.residence[1]}
                    </td>
                    <td>
                      <Switch.Root
                        className="SwitchRoot"
                        checked={user.isActive}
                        onClick={() => handleUserStatus(user?.id)}
                      >
                        <Switch.Thumb className="SwitchThumb" />
                      </Switch.Root>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </UsersTable>
      </div>
      {width && width < breakpoint && (
        <>
          {users?.map((resident) => {
            return (
              <UserCard
                {...resident}
                key={resident.id}
                handleUserStatus={handleUserStatus}
                handleUserRole={handleUserRole}
              />
            );
          })}
        </>
      )}
    </UsersContainer>
  );
}
