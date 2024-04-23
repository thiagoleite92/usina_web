import * as Separator from '@radix-ui/react-separator';
import { NavBarContainer } from './styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigation } from './navigation';
import { useWindowSize } from '../../hooks/useWindowSize';

export function NavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { width } = useWindowSize();

  return (
    <NavBarContainer width={width}>
      <ul>
        {navigation.map((nav, index) => {
          return (
            <>
              <li
                className={`${
                  pathname?.includes(nav.pathname) ? 'selected' : ''
                }`}
                onClick={() =>
                  pathname?.includes(nav.pathname) ? '' : navigate(nav.pathname)
                }
              >
                {nav.location}
              </li>

              {!(index === navigation?.length - 1) && (
                <Separator.Root
                  className="SeparatorRoot"
                  decorative
                  orientation="vertical"
                />
              )}
            </>
          );
        })}
      </ul>
    </NavBarContainer>
  );
}
