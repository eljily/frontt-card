import { Component } from '@angular/core';
import {RequestsService} from "../../../service/requests.service";
import {Batch} from "../../../model/Batch";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.scss']
})
export class CreateBatchComponent {
  request: Batch= {
    lib: '',
  };

  validation: any = {
    batchLabel: '',
  };

  constructor(private service: RequestsService) {
  }

  saveBatchLabel() {
    if (!this.request.lib) {
      this.validation.batchLabel = 'ne peux pas etre vide';
      return;
    }
    this.service.saveBatch(this.request).subscribe({
      next:(data)=>{alert("Ajouter Avec Succes")},
      error:err => console.log(err)
    })

  }
}


