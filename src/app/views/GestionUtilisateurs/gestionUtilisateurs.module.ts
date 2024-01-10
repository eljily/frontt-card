import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  NavModule,
  PaginationModule,
  ProgressModule,
  TableModule,
  TabsModule,
  ToastModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { GestionUtilisateursComponent } from './gestionUtilisateurs.component';
import { HttpClientModule } from '@angular/common/http';
import { GestionUtilisateursRoutingModule } from './gestionUtilisateurs-routing.module';
import { GestionUtilisateursService } from '../../service/gestion-utilisateurs.service';

@NgModule({
  imports: [
    GestionUtilisateursRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    FormsModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    ToastModule,
    HttpClientModule,
    PaginationModule,
    ModalModule,
  ],
  declarations: [GestionUtilisateursComponent],
  providers: [GestionUtilisateursService],
})
export class GestionUtilisateursModule {}
