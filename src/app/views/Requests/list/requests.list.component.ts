import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/auth.service';
import { allowNavigation, ruler } from 'src/app/shared/pagination';
import { NumberedPagination } from 'src/app/shared/numbered-pagination.interface';
import { RequestsService } from 'src/app/service/requests.service';
import { Request } from 'src/app/model/Request';

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
  templateUrl: 'requests.list.component.html',
  styleUrls: [],
})
export class RequestsListComponent implements OnInit {
  requests: Request[] = [];
  errorVisible = false;
  sucessVisible = false;
  sucessModification = false;
  errorModification = false;
  hasModificationRights = false;
  numPage = 0;
  maxPages = 0;
  pageSize = 5;
  rulerLength = 5;
  constructor(
    private service: RequestsService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.hasModificationRights = this.authService.hasModificationRight();
    this.fetchData();
  }

  updatePage(numPage: number) {
    this.numPage = numPage;
    this.fetchData();
  }
  fetchData() {
    this.service.findAll(this.numPage, this.pageSize).subscribe((data) => {
      this.requests = data.data;
      this.maxPages = data.total;
      if (data.total < 5) this.rulerLength = data.total;
      else this.rulerLength = 5;
    });
  }
  navigateToPage(pageNumber: number): void {
    if (allowNavigation(pageNumber, this.numPage, this.maxPages)) {
      this.numPage = pageNumber;
      this.fetchData();
    }
  }
  get pagination(): NumberedPagination {
    const { numPage, maxPages, rulerLength } = this;
    const pages = ruler(numPage, maxPages, rulerLength);
    return { numPage, maxPages, pages } as NumberedPagination;
  }
}
