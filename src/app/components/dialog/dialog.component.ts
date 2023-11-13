import { VendaCreateComponent } from './../venda/venda-create/venda-create.component';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() troco: number;

  constructor() { }

  ngOnInit(): void {
  }

}
