import { Component, OnInit } from '@angular/core';

import { RequestsService } from 'src/app/service/requests.service';
import {
  Request,
  RequestValidation,
  emptyRequestValidation,
} from 'src/app/model/Request';
import { CardType } from 'src/app/model/CardType';
import { CardTypeService } from 'src/app/service/card.type.service';
import { Account } from 'src/app/model/Account';
import { AccountService } from 'src/app/service/account.service';
import {
  isValid,
  validateRequestForSave,
} from 'src/app/utils/validation-utils';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessMode } from 'src/app/shared/access.mode';
import { CardService } from 'src/app/service/card.service';
import { Card } from 'src/app/model/Card';

export enum Colors {
  '' = '',
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  dark = 'dark',
  light = 'light',
}
@Component({
  templateUrl: 'request.create.component.html',
  styleUrls: ['request.create.component.scss'],
})
export class RequestCreateComponent implements OnInit {
  account: Account = {} as Account;
  card: Card = {} as Card;
  request: Request = {} as Request;
  renew = false;
  modalAccountOpen = false;
  modalCardOpen = false;
  accountSuggestions: Account[] = [];
  searchText = '';
  months = Array.from(Array(12).keys()).map((x) => new Date(2000, x, 2));
  cardTypes: CardType[] = [];
  validation: RequestValidation = emptyRequestValidation();
  submitMessage = '';
  hasError = false;
  isVisible = false;
  needToNavigate = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: RequestsService,
    private cardTypeService: CardTypeService,
    private accountService: AccountService,
    private cardService: CardService,
  ) {}

  ngOnInit(): void {
    this.cardTypeService.findAll().subscribe((data) => {
      this.cardTypes = data;
    });
    this.route.snapshot.data['mode'] == AccessMode.MODIFY &&
      this.route.paramMap.subscribe((paramMap) => {
        const id = paramMap.get('id');
        if (id) {
          this.service.findById(id).subscribe({
            next: (data: Request) => {
              this.request = data;
              this.request.cardType = this.cardTypes.find(
                (card) => card.id === data.cardType?.id,
              );
            },
            error: () => this.router.navigate(['requests']),
          });
        }
      });
  }
  save() {
    this.validation = validateRequestForSave(this.request, this.renew);
    if (!isValid(this.validation)) return;
    this.service.save(this.request).subscribe({
      next: (data) => {
        this.request = data;
        this.request.cardType = this.cardTypes.find(
          (card) => card.id === data.cardType?.id,
        );
        this.submitMessage = 'demander a été creé';
        this.isVisible = true;
        this.needToNavigate = true;
      },
      error: () => {
        this.submitMessage = 'Erreur lors de la creation du demande';
        this.isVisible = true;
        this.hasError = true;
      },
    });
  }
  update() {
    this.validation = validateRequestForSave(this.request, this.renew);
    if (!isValid(this.validation)) return;
    this.service.update(this.request).subscribe({
      next: (data) => {
        this.request = data;
        this.request.cardType = this.cardTypes.find(
          (card) => card.id === data.cardType?.id,
        );
        this.submitMessage = 'demander a été creé';
        this.isVisible = true;
        this.needToNavigate = true;
      },
      error: () => {
        this.submitMessage = 'Erreur lors de la creation du demande';
        this.isVisible = true;
        this.hasError = true;
      },
    });
  }
  navigate(targetValue: boolean) {
    if (!targetValue && this.needToNavigate) {
      this.router.navigate(['requests']);
    }
  }
  addAccount() {
    this.request.account = this.account;
    this.handleModalChange('Account', false);
  }
  addCard() {
    this.request.card = this.card;
    this.handleModalChange('Card', false);
  }
  openModal(type: 'Account' | 'Card') {
    if (type === 'Account') this.modalAccountOpen = true;
    else if (type === 'Card') this.modalCardOpen = true;
    this.searchText = '';
  }
  selectAccount(account: Account) {
    this.request.account = account;
    this.handleModalChange('Account', false);
  }
  cancelAccountSelection() {
    this.account = {} as Account;
    this.handleModalChange('Account', false);
  }
  selectCard(card: Card) {
    this.request.card = card;
    this.handleModalChange('Card', false);
  }
  cancelCardSelection() {
    this.card = {} as Card;
    this.handleModalChange('Card', false);
  }
  handleRenewChange(event: boolean) {
    if (!event) {
      delete this.request.card;
      delete this.request.renewMonth;
    }
  }
  handleModalChange(type: 'Account' | 'Card', event: boolean) {
    if (type === 'Account') this.modalAccountOpen = event;
    else if (type === 'Card') this.modalCardOpen = event;
    this.searchText = '';
  }
  searchForAccount(seachWord: string): Observable<Account[]> {
    return this.accountService.find(seachWord ?? '');
  }
  formatAccount(account: Account): string {
    return account.accountNumber;
  }
  searchForCard(seachWord: string): Observable<Card[]> {
    return this.cardService.find(seachWord ?? '');
  }
  formatCard(card: Card): string {
    return card.cardNum;
  }
  updatePhoneNumber(value: any) {
    if (this.request?.account?.customer)
      this.request.account.customer.phoneNumber = value;
  }
  updateEmail(value: any) {
    if (this.request?.account?.customer)
      this.request.account.customer.email = value;
  }
}
