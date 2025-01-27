export interface Sistema {
  id_sistema: number;
  descricao: string;
  sigla: string;
}

export interface Regra {
  id_regra: number;
  descricao: string;
}

export interface Acao {
  id_acao: number;
  descricao: string;
}

export interface Controller {
  id_controller: number;
  descricao: string;
  descricao_geral: string;
}
