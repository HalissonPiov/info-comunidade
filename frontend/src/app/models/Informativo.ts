export interface Informativo {
  titulo: string;
  descricao: string;
  hashtags?: string[];
  imagemURL?: string;
  usuarioId: string;
  enderecoId?: string;
  publicoAlvo?: string;
}
