import { Component, OnInit } from '@angular/core';

import { User } from '../../model/GestionUtilisateurs';
import { GestionUtilisateursService } from 'src/app/service/gestion-utilisateurs.service';
import { AuthService } from 'src/app/shared/auth.service';
import { ruler } from 'src/app/shared/pagination';
import { NumberedPagination } from 'src/app/shared/numbered-pagination.interface';
import { Role } from '../../model/Role';
import { Router } from '@angular/router';

export interface CacheGestionUtilisateurs {
  edit: boolean;
  data: User;
}

@Component({
  templateUrl: 'gestionUtilisateurs.component.html',
  styleUrls: ['gestionUtilisateurs.component.scss'],
})
export class GestionUtilisateursComponent implements OnInit {
  editCache: { [key: string]: CacheGestionUtilisateurs } = {};
  users: User[] = [];
  aideuser: User[] = [];
  roles: Role[] = [];
  aiderol: Role[] = [];
  errorVisible = false;
  sucessVisible = false;
  sucessModification = false;
  errorModification = false;
  hasModificationRights = false;
  numPage = 0;
  maxPages = 0;
  pageSize = 10;
  rulerLength = 5;
  isrole = false;
  usernameDelete = '';
  constructor(
    private service: GestionUtilisateursService,
    private authService: AuthService,
    public router: Router,
  ) {}
  updateEditCache(): void {
    this.users.forEach((item) => {
      this.editCache[item.username] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  updateEditCachetrue(r: Role, username: string, ischek: boolean): void {
    this.users.forEach((item) => {
      if (ischek) {
        item.roles.push(r.name);
        const index = item.roles.findIndex((x) => x === r.name);
        item.roles[index];
      } else {
        const index = item.roles.findIndex((x) => x === r.name);
        if (index > -1) {
          item.roles.splice(index, 1);
        }
      }
      if (item.username == username) {
        this.editCache[item.username] = {
          edit: true,
          data: { ...item },
        };
      }
    });
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.users.findIndex((item) => item.username === id);
    this.editCache[id] = {
      data: { ...this.users[index] },
      edit: false,
    };
    window.location.reload();
  }

  saveEdit(id: string): void {
    const index = this.users.findIndex((item) => item.username === id);
    this.service.update(this.editCache[id].data).subscribe(
      (response) => {
        if (response) {
          this.showSuccessModification();
        } else this.showErrorModification();
      },
      () => {
        this.showErrorModification();
      },
    );
    Object.assign(this.users[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  deleteUser(): void {
    const index = this.users.findIndex(
      (item) => item.username === this.usernameDelete,
    );
    this.service
      .deleteUser(this.editCache[this.usernameDelete].data.username)
      .subscribe(
        (response) => {
          if (response) {
            this.showSuccessModification();
          } else this.showErrorModification();
        },
        () => {
          this.showErrorModification();
        },
      );
    Object.assign(this.users[index], this.editCache[this.usernameDelete].data);
    this.editCache[this.usernameDelete].edit = false;
    this.visible = !this.visible;
  }

  saveUser(): void {
    this.users.push({
      username: '',
      email: '',
      password: '',
      roles: [],
      codeAgency: 'c',
    });
    this.updateEditCache();
    this.editCache[''].edit = true;
  }
  ngOnInit(): void {
    this.hasModificationRights = this.authService.hasModificationRight();
    this.fetchRole();
    this.fetchData();
  }

  fetchRole() {
    this.service.findRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  fetchData() {
    this.service.findAll().subscribe((data) => {
      this.users = data;
      this.users.forEach((item) => {

      });
      this.updateEditCache();
    });
    this.users.sort();
  }

  findRole(name: string, username: string): boolean {
    this.isrole = false;
    this.users.forEach((item) => {
      if (item.username == username) {
        this.isrole = false;
        item.roles.forEach((item2) => {
          if (item2 == name) {
            this.isrole = true;
          }
        });
      }
    });

    return this.isrole;
  }
  onCheckboxChange(e: any, username: string, r: Role) {
    this.updateEditCachetrue(r, username, e.target.checked);
  }

  get pagination(): NumberedPagination {
    const { numPage, maxPages, rulerLength } = this;
    const pages = ruler(numPage, maxPages, rulerLength);
    return { numPage, maxPages, pages } as NumberedPagination;
  }

  addErrorToast() {
    this.errorVisible = true;
  }
  addSuccessToast() {
    this.sucessVisible = true;
  }
  showErrorModification() {
    this.errorModification = true;
  }
  showSuccessModification() {
    this.sucessModification = true;
  }

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  confirmeDelete(id: string) {
    this.usernameDelete = id;
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
}
