export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export interface Categoria {
  id: number;
  descricao: string;
  finalidade: number;
  finalidadeDescricao: string;
}

export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipoDescricao: string; 
}


export interface ResultadoTotais<T> {
  itens: T[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoLiquidoGeral: number;
}

export interface TotalPessoa {
  nomePessoa: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface TotalCategoria {
  descricaoCategoria: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}