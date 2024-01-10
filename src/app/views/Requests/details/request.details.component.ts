import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/auth.service';
import { RequestsService } from 'src/app/service/requests.service';
import { Request } from 'src/app/model/Request';
import { ActivatedRoute } from '@angular/router';

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
  templateUrl: 'request.details.component.html',
  styleUrls: ['request.details.component.scss'],
})
export class RequestDetailsComponent implements OnInit {
  request?: Request;
  constructor(
    private service: RequestsService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id &&
      this.service.findById(id).subscribe((request) => {
        this.request = request;
      });
  }
}
