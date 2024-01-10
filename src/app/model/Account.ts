import { Agency } from './Agency';
import { Customer } from './Customer';

export interface Account {
  id: number;
  accountNumber: string;
  agency: Agency;
  customer?: Customer;
}
