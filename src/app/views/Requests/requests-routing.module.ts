import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RequestsListComponent } from './list/requests.list.component';
import { RequestCreateComponent } from './create/request.create.component';
import { AccessMode } from '../../shared/access.mode';
import {ListAcceptedComponent} from "./list-accepted/list-accepted.component";
import {CreateBatchComponent} from "./create-batch/create-batch.component";
const routes: Routes = [
  {
    path: 'list',
    component: RequestsListComponent,
    data: {
      title: $localize`Gestion des demandes`,
    },
  },
  {
    path: 'details/:id',
    component: RequestCreateComponent,
    data: {
      title: $localize`Details du demande`,
      mode: AccessMode.MODIFY,
    },
  },{
    path: 'listAccepted',
    component: ListAcceptedComponent,
    data: {
      title: $localize`Gestion Des Lots`,
    },
  },
  {
    path: 'add',
    component: RequestCreateComponent,
    data: {
      title: $localize`ajout du demande`,
      mode: AccessMode.MODIFY,
    },
  },
  {
    path: 'addBatch',
    component: CreateBatchComponent,
    data: {
      title: $localize`ajouter du batch`,
      mode: AccessMode.MODIFY,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsRoutingModule {}
