import { Role } from './role';

export class User {
  username!: string;
  roles!: Role[];
  token!: string;
}
