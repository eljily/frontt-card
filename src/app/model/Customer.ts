export interface Customer {
  id: number;
  nni: string;
  title: string;
  lastName: string;
  firstName: string;
  birthDate: Date;
  phoneNumber?: string;
  address: string;
  email?: string;
}
