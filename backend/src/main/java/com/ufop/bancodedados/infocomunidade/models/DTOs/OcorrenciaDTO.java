package com.ufop.bancodedados.infocomunidade.models.DTOs;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OcorrenciaDTO {
    @NotBlank(message = "O título é obrigatório")
    @Size(min = 10, max = 30, message = "O título deve ter entre 10 e 30 caracteres")
    private String titulo;

    @NotBlank(message = "A descrição é obrigatória")
    private String descricao;
    private List<String> hashtags;
    private String imagemURL;
    private String usuarioId;
    private String enderecoId;
    private String setor;
}