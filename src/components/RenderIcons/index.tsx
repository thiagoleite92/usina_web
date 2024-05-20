import { House, UsersFour } from 'phosphor-react';

interface RenderIconsProps {
  icon: string;
  size: number;
}

export function RenderIcons({ icon, size }: RenderIconsProps) {
  const icons = {
    house: <House size={size} />,
    residents: <UsersFour size={size} />,
  };

  return icons[icon as keyof typeof icons];
}
