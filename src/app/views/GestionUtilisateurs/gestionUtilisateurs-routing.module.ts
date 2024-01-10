import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GestionUtilisateursComponent } from './gestionUtilisateurs.component';

const routes: Routes = [
  {
    path: '',
    component: GestionUtilisateursComponent,
    data: {
      title: $localize`Gestion Utilisateurs`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionUtilisateursRoutingModule {}
