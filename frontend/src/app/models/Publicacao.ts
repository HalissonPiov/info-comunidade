import { Endereco } from './Endereco';
import { User } from './User';
export interface Publicacao {
  idPublicacao: string;
  titulo: string;
  descricao: string;
  dataCriacao: string;
  hashtags?: string[];
  endereco?: Endereco;
  imagemURL?: string;
  usuario: User;
  setor?: string;
  publicoAlvo?: string;
}
