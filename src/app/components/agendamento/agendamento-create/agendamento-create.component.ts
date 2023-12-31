import { DialogComponent } from './../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ItensAgendamentoService } from './../../../services/itens-agendamento.service';
import { ItensAgendamento } from './../../../models/itensAgendamento';
import { Item } from './../../../models/item';
import { ItemService } from 'src/app/services/item.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';

@Component({
  selector: 'app-agendamento-create',
  templateUrl: './agendamento-create.component.html',
  styleUrls: ['./agendamento-create.component.css']
})
export class AgendamentoCreateComponent implements OnInit {

  itens: Item[] = [];
  clientes: Cliente[] = []

  codBarra: string
  i: number = 0
  valorPago: number
  troco: number
  
  agendamento: Agendamento = {
    id: '',
    dataHora: new Date(),
    itens: [],
    itensAgendamento: [],
    cliente: '',
    qtdItens: 0,
    valorTotal: 0,
    telefone: '',
    pagamento: '', 
    status: '',
    nomeCliente: '',
    end: '',   
  }

  itensAgendamento: ItensAgendamento = {
    id: '',
    codBarra: '',
    item: '',
    valorUnit: 0,
    agendamento: '',
    tamanho: '',
  }

  cliente: FormControl = new FormControl(null, Validators.required);
  pagamento: FormControl = new FormControl(null, Validators.required);
  codBarraT: FormControl = new FormControl(null, Validators.required);
  qtdItens: FormControl = new FormControl(null, Validators.required);
  valorTotal: FormControl = new FormControl(null, Validators.required);
  status: FormControl = new FormControl(null, Validators.required);
  end: FormControl = new FormControl(null, Validators.required);
  telefone: FormControl = new FormControl(null, Validators.required);
  valorPagoT: FormControl = new FormControl(null, Validators.required);
  
  
  constructor(
    private agendamentoService: AgendamentoService,
    private itemService: ItemService,
    private clienteService: ClienteService,
    private toast: ToastrService,
    private itensAgendamentoService: ItensAgendamentoService,   
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.qtdItens.disable();
    this.valorTotal.disable();
    this.end.disable();
    this.telefone.disable();
  }

  verificaAgendamento(): void {   
    if(this.verificaCodBarra()){
      this.agendamento.itensAgendamento.push(this.codBarra)
      this.itensAgendamentoService.findByCodBarra(this.codBarra).subscribe(resposta => {
        this.itensAgendamento = resposta;
        if(this.itensAgendamento.id != 0) {
          if(this.itensAgendamento.agendamento.status != 'SOLICITADO' && this.itensAgendamento.agendamento.status != 'ANDAMENTO'){       
            this.itemTabela();
          }else{
            this.toast.warning('Item já econtra-se agendado para entrega', 'Agendado');
          }
        }else{
          this.itemTabela();
        }
      });   
    }else{
      this.toast.warning('Item já inserido no agendamento', 'Agendamento');
    }   
  }

  verificaCodBarra(): boolean {
    var flag = true;
    for(var x=0; x < this.agendamento.itensAgendamento.length; x++){
      if(this.agendamento.itensAgendamento[x] == this.codBarra){
        flag = false
      }
    }
    return flag;
  }

  itemTabela(): void {
    this.itemService.findByCodBarra(this.codBarra).subscribe(resposta => {           
      this.itens.push(resposta);
      this.agendamento.qtdItens = this.agendamento.qtdItens + 1;
      this.qtdItens.setValue(this.agendamento.qtdItens);      
      this.agendamento.valorTotal = this.agendamento.valorTotal + this.itens[this.i].valor;
      this.i = this.i + 1;
      this.valorTotal.setValue(this.agendamento.valorTotal);
    }, ex => { 
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
        this.agendamento.itensAgendamento.pop();
      }
    })
    this.codBarraT.reset(); 
  }

  create(): void {    
    this.agendamentoService.create(this.agendamento).subscribe(() => {   
      this.troco = this.valorPago - this.agendamento.valorTotal;   
      this.toast.success('Agendamento efetuado com sucesso', 'Cadastro');
      this.router.navigate(['agendamentos']);
      if(this.agendamento.pagamento == '0'){
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

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  openDialog(): void {
    const modalRef = this.dialog.open(DialogComponent);
    modalRef.componentInstance.troco = this.troco;
  }

  validaCampos(): boolean {
    if(this.itens.length > 0) {
      if(this.agendamento.pagamento == '0') { 
        return this.valorPagoT.valid;
      }  
      return this.cliente.valid && this.pagamento.valid && this.status.valid;  
    }else{
      return false;
    }
  }

  carregarEnd(): void {
    for (let x = 0; x <= this.clientes.length; x++) {
      if(this.clientes[x].id == this.agendamento.cliente){
        this.agendamento.end = this.clientes[x].endereco;
        this.agendamento.telefone = this.clientes[x].telefone;
      }
    }
  }

  validaCodBarra(): boolean {
    return this.codBarraT.valid; 
  }

  habilitaValorPago(): void {
    if(this.agendamento.pagamento == '0') { 
      this.valorPagoT.enable();
    }else{
      this.valorPagoT.reset();
      this.valorPagoT.disable();
    }
  }

}