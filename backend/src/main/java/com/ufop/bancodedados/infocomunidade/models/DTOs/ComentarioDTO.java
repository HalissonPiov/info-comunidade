package com.ufop.bancodedados.infocomunidade.models.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComentarioDTO {
    private String texto;
    private String publicacaoID;
    private String usuarioID;
    private boolean excluido;
}
