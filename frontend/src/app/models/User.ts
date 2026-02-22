export interface User {
  id?: string;
  nome: string;
  username: string;
  bairro: string;
  dataNascimento: string;
  senha: string;
  excluido?: string;
}
