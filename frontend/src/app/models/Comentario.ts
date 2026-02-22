import { Publicacao } from "./Publicacao"
import { User } from "./User"

export interface Comentario {
  id: string
  texto: string
  dataCriacao: string
  usuario: User
  publicacao: Publicacao
}
