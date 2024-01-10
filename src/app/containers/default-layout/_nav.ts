import { INavData } from '@coreui/angular';
import { Role } from 'src/app/shared/role';
export interface NavData extends INavData {
  role?: Role[];
}
export const navItems: NavData[] = [
  {
    name: 'Gestion des demandes',
    url: '/requests/list',
    iconComponent: { name: 'cil-arrow-thick-from-left' },
    role: [Role.ADMIN],
  },
  {
    name: 'Gestion Des Lots',
    url: '/requests/listAccepted',
    iconComponent: { name: 'cil-arrow-thick-from-left' },
    role: [Role.ADMIN],
  },
  {
    name: 'Gestion des utilisateurs',
    url: '/gestionUtilisateurs',
    iconComponent: { name: 'cil-arrow-thick-from-left' },
    role: [Role.ADMIN],
  },
];
