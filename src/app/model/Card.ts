import { Account } from './Account';
import { CardType } from './CardType';

export interface Card {
  id: number;
  cardNum: string;
  account: Account;
  cardType: CardType;
  activationDate: Date;
  expireDate: Date;
}
