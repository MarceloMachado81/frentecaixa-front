import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Para trabalhar com formulários no Angular 12
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Imports para componentes do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

// Componentes do projeto
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteReadComponent } from './components/cliente/cliente-read/cliente-read.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { ProdutoCreateComponent } from './components/produto/produto-create/produto-create.component';
import { ProdutoUpdateComponent } from './components/produto/produto-update/produto-update.component';
import { ProdutoDeleteComponent } from './components/produto/produto-delete/produto-delete.component';
import { ProdutoReadComponent } from './components/produto/produto-read/produto-read.component';
import { FornecedorCreateComponent } from './components/fornecedor/fornecedor-create/fornecedor-create.component';
import { FornecedorListComponent } from './components/fornecedor/fornecedor-list/fornecedor-list.component';
import { FornecedorUpdateComponent } from './components/fornecedor/fornecedor-update/fornecedor-update.component';
import { FornecedorDeleteComponent } from './components/fornecedor/fornecedor-delete/fornecedor-delete.component';
import { FornecedorReadComponent } from './components/fornecedor/fornecedor-read/fornecedor-read.component';
import { ItemListComponent } from './components/item/item-list/item-list.component';
import { ItemCreateComponent } from './components/item/item-create/item-create.component';
import { ItemDeleteComponent } from './components/item/item-delete/item-delete.component';
import { ItemReadComponent } from './components/item/item-read/item-read.component';
import { LoginComponent } from './components/login/login.component';
import { SenhaMenuComponent } from './components/senha/senha-menu/senha-menu.component';
import { SenhaCreateComponent } from './components/senha/senha-create/senha-create.component';
import { SenhaDeleteComponent } from './components/senha/senha-delete/senha-delete.component';
import { VendaListComponent } from './components/venda/venda-list/venda-list.component';
import { VendaCreateComponent } from './components/venda/venda-create/venda-create.component';
import { VendaDeleteComponent } from './components/venda/venda-delete/venda-delete.component';
import { VendaReadComponent } from './components/venda/venda-read/venda-read.component';
import { AgendamentoListComponent } from './components/agendamento/agendamento-list/agendamento-list.component';
import { AgendamentoCreateComponent } from './components/agendamento/agendamento-create/agendamento-create.component';
import { AgendamentoUpdateComponent } from './components/agendamento/agendamento-update/agendamento-update.component';
import { AgendamentoReadComponent } from './components/agendamento/agendamento-read/agendamento-read.component';
import { RelatorioCreateComponent } from './components/relatorio/relatorio-create/relatorio-create.component';
import { CurrencyMaskConfig ,  CurrencyMaskModule ,  CURRENCY_MASK_CONFIG }  from  'ng2-currency-mask' ; 
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { LocalDateTimePipe } from './pipe/local-date-time.pipe';

registerLocaleData(ptBr);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    ClienteCreateComponent,
    ClienteDeleteComponent,
    ClienteListComponent,
    ClienteReadComponent,
    ClienteUpdateComponent,
    ProdutoListComponent,
    ProdutoCreateComponent,
    ProdutoUpdateComponent,
    ProdutoDeleteComponent,
    ProdutoReadComponent,
    FornecedorCreateComponent,
    FornecedorListComponent,
    FornecedorUpdateComponent,
    FornecedorDeleteComponent,
    FornecedorReadComponent,
    ItemListComponent,
    ItemCreateComponent,
    ItemDeleteComponent,
    ItemReadComponent,
    LoginComponent,
    SenhaMenuComponent,
    SenhaCreateComponent,
    SenhaDeleteComponent,
    VendaListComponent,
    VendaCreateComponent,
    VendaDeleteComponent,
    VendaReadComponent,
    AgendamentoListComponent,
    AgendamentoCreateComponent,
    AgendamentoUpdateComponent,
    AgendamentoReadComponent,
    RelatorioCreateComponent,
    DialogComponent,
    LocalDateTimePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Requisições http
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,  
    MatDialogModule, 
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskModule.forRoot(),
    CurrencyMaskModule

  ],
  providers: [AuthInterceptorProvider,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    LocalDateTimePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
