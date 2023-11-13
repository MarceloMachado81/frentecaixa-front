import { DialogComponent } from './../../dialog/dialog.component';
import { ItensAgendamento } from './../../../models/itensAgendamento';
import { ItensAgendamentoService } from './../../../services/itens-agendamento.service';
import { Item } from './../../../models/item';
import { ItemService } from 'src/app/services/item.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Venda } from 'src/app/models/venda';
import { VendaService } from 'src/app/services/venda.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-venda-create',
  templateUrl: './venda-create.component.html',
  styleUrls: ['./venda-create.component.css']
})
export class VendaCreateComponent implements OnInit {

  itens: Item[] = [];  
  
  codBarra: string
  i: number = 0
  valorPago: number
  troco: number

  itensAgendamento: ItensAgendamento = {
    id: '',
    codBarra: '',
    item: '',
    valorUnit: 0,
    agendamento: '',
    tamanho: '',
  }
  
  venda: Venda = {
    id: '',
    dataHora: '',
    dataHoraRegistro: '',
    hora: '',
    itens: [],
    itensVenda: [],
    qtdItens: 0,
    valorTotal: 0,
    pagamento: '',    
  }

  pagamento: FormControl = new FormControl(null, Validators.required);
  codBarraT: FormControl = new FormControl(null, Validators.required);
  qtdItens: FormControl = new FormControl(null, Validators.required);
  valorTotal: FormControl = new FormControl(null, Validators.required);
  valorPagoT: FormControl = new FormControl(null, Validators.required);
  
  
  constructor(
    private vendaService: VendaService,
    private itemService: ItemService,
    private toast: ToastrService,
    private itensAgendamentoService: ItensAgendamentoService,    
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.qtdItens.disable();
    this.valorTotal.disable();
    this.valorPagoT.disable();
  }

  verificaAgendamento(): void {       
    if(this.verificaCodBarra()){
      this.venda.itensVenda.push(this.codBarra)
      this.itensAgendamentoService.findByCodBarra(this.codBarra).subscribe(resposta => {
        this.itensAgendamento = resposta;
        if(this.itensAgendamento.id != 0) {
          if(this.itensAgendamento.agendamento.status != 'SOLICITADO' && this.itensAgendamento.agendamento.status != 'ANDAMENTO'){       
            this.itemTabela();
          }else{
            this.toast.warning('Item agendado para entrega', 'Agendado');
          }
        }else{
          this.itemTabela();
        }
      });  
    }else{
      this.toast.warning('Item já inserido na venda', 'Venda');
    } 
  }

  verificaCodBarra(): boolean {
    var flag = true;
    for(var x=0; x < this.venda.itensVenda.length; x++){
      if(this.venda.itensVenda[x] == this.codBarra){
        flag = false
      }
    }
    return flag;
  }

  create(): void {
    this.vendaService.create(this.venda).subscribe(() => {
      this.troco = this.valorPago - this.venda.valorTotal;
      this.toast.success('Venda efetuada com sucesso', 'Cadastro');      
      this.router.navigate(['vendas']);
      if(this.venda.pagamento == '0'){
        this.openDialog();
      }
    }, ex => {      
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }      
    })    
  }

  itemTabela(): void {
    this.itemService.findByCodBarra(this.codBarra).subscribe(resposta => {           
      this.itens.push(resposta);
      this.venda.qtdItens = this.venda.qtdItens + 1;
      this.qtdItens.setValue(this.venda.qtdItens);      
      this.venda.valorTotal = this.venda.valorTotal + this.itens[this.i].valor;
      this.i = this.i + 1;
      this.valorTotal.setValue(this.venda.valorTotal);
      }, ex => { 
        if(ex.error.errors) {
          ex.error.errors.forEach(element => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
          this.venda.itensVenda.pop();
        }
      })
      this.codBarraT.reset(); 
  }

  validaCampos(): boolean {
    if(this.itens.length > 0) {   
      if(this.venda.pagamento == '0') {         
        return this.valorPagoT.valid;         
      } 
      return this.pagamento.valid;     
    }else{
      return false;
    }
  }

  validaCodBarra(): boolean {
    return this.codBarraT.valid; 
  }

  openDialog(): void {
    const modalRef = this.dialog.open(DialogComponent);
    modalRef.componentInstance.troco = this.troco;
  }

  habilitaValorPago(): void {
    if(this.venda.pagamento == '0') { 
      this.valorPagoT.enable();
    }else{
      this.valorPagoT.reset();
      this.valorPagoT.disable();
    }
  }

}