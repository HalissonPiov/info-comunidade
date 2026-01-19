package com.ufop.bancodedados.infocomunidade.models.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComentarioDTO {
    @NotBlank(message = "Para publicar um comentário, o texto do mesmo é obrigatório")
    @Size(min = 1, max = 350, message = "O comentário deve ter entre 1 e 350 caracteres")
    private String texto;
    private String publicacaoID;
    private String usuarioID;
    private boolean excluido;
}

