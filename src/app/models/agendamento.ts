export interface Agendamento{
    id: any;
    dataHora: Date;
    itens: any[];
    itensAgendamento: string[];
    cliente: any;
    qtdItens: number;
    valorTotal: number;
    telefone: string;
    pagamento: string; 
    status: any;
    nomeCliente: string;
    end: string;
}