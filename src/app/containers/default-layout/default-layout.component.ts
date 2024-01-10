import { Component, OnInit } from '@angular/core';

import { navItems } from './_nav';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    const roles = this.authService.currentUserValue?.roles;
    this.navItems = this.navItems.filter((item) => {
      if (
        !item.role ||
        item.role?.filter((role) => {
          return roles?.includes(role);
        }).length > 0
      )
        return true;
      return false;
    });
  }
}
