import { ReactNode } from 'react';
import { LayoutContainer } from './styles';
import { NavBar } from '../NavBar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <LayoutContainer>
      {children}
      <NavBar />
    </LayoutContainer>
  );
}
