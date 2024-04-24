import * as Switch from '@radix-ui/react-switch';
import { useContextSelector } from 'use-context-selector';
import { ResidentsContext } from '../../../contexts/ResidentsContext';
import { ResidentsContainer, ResidentsTable, TitleContainer } from './styles';
import { columnHeadsResidents } from '../../../const/columnsHeads';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { breakpoint } from '../../../const/breakpoint';
import { UnitSelect } from '../../../components/Select';
import { RoleEnum } from '../../../enums/RoleEnum';

export function ResidentsPage() {
  const { residents, handleUserStatus, handleUserRole } = useContextSelector(
    ResidentsContext,
    ({ residents, handleUserStatus, handleUserRole }) => ({
      residents,
      handleUserStatus,
      handleUserRole,
    })
  );

  const { width } = useWindowSize();

  return (
    <ResidentsContainer>
      <TitleContainer>
        <h3>MORADORES</h3>
      </TitleContainer>
      <div>
        <ResidentsTable>
          {width && width >= breakpoint && (
            <>
              <thead>
                <tr>
                  {columnHeadsResidents.map((head) => (
                    <th key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {residents?.map((resident) => (
                  <tr key={resident?.id}>
                    <td>{resident?.name}</td>
                    <td>{resident?.email}</td>
                    <td>
                      <UnitSelect
                        options={[
                          { label: 'Residente', value: 'DWELLER' },
                          { label: 'Síndico', value: 'ADMIN' },
                        ]}
                        placeholder="Selecione Atribuição"
                        onChange={() => {
                          handleUserRole(resident?.id);
                        }}
                        defaultValue={{
                          label: RoleEnum[resident.role],
                          value: resident?.role,
                        }}
                      />
                    </td>
                    <td>
                      {resident?.residence[0]?.toUpperCase()} -{' '}
                      {resident?.residence[1]}
                    </td>
                    <td>
                      <Switch.Root
                        className="SwitchRoot"
                        checked={resident.isActive}
                        onClick={() => handleUserStatus(resident?.id)}
                      >
                        <Switch.Thumb className="SwitchThumb" />
                      </Switch.Root>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </ResidentsTable>
      </div>
    </ResidentsContainer>
  );
}
