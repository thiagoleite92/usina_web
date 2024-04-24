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
        {navigation.map((nav) => {
          return (
            <li
              key={nav?.location}
              className={`${
                pathname?.includes(nav?.pathname) ? 'selected' : ''
              }`}
              onClick={() =>
                pathname?.includes(nav?.pathname) ? '' : navigate(nav?.pathname)
              }
            >
              {nav?.location}
            </li>
          );
        })}
      </ul>
    </NavBarContainer>
  );
}
