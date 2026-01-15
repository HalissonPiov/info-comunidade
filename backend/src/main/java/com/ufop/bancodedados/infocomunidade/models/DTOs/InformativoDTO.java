package com.ufop.bancodedados.infocomunidade.models.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InformativoDTO {
    private String titulo;
    private String descricao;
    private List<String> hashtags;
    private String imagemURL;
    private String usuarioId;
    private String enderecoId;
    private String publicoAlvo;
}
