export interface Ocorrencia {
  titulo: string;
  descricao: string;
  hashtags?: string[];
  imagemURL?: string;
  usuarioId: string;
  enderecoId?: string;
  setor?: string;
}
