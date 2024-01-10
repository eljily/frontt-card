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
  HeaderModule,
  ListGroupModule,
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

import { RequestsListComponent } from './list/requests.list.component';
import { RequestDetailsComponent } from './details/request.details.component';
import { RequestCreateComponent } from './create/request.create.component';

import { HttpClientModule } from '@angular/common/http';
import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsService } from '../../service/requests.service';
import { CardTypeService } from '../../service/card.type.service';
import { AccountService } from '../../service/account.service';
import { CardService } from '../../service/card.service';

import { AutocompleteinputComponent } from 'src/app/components/autocompleteinput/autocompleteinput.component';
import { ListAcceptedComponent } from './list-accepted/list-accepted.component';
import { CreateBatchComponent } from './create-batch/create-batch.component';

@NgModule({
  imports: [
    RequestsRoutingModule,
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
    HeaderModule,
    ListGroupModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    ToastModule,
    HttpClientModule,
    PaginationModule,
    ModalModule,
  ],
  declarations: [
    RequestsListComponent,
    RequestDetailsComponent,
    RequestCreateComponent,
    AutocompleteinputComponent,
    ListAcceptedComponent,
    CreateBatchComponent,
  ],
  providers: [RequestsService, CardTypeService, AccountService, CardService],
})
export class RequestsModule {}
