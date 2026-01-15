package com.ufop.bancodedados.infocomunidade.models;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Document(collection = "publicacao")
public abstract class Publicacao implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private String idPublicacao;

    private String titulo;
    private String descricao;
    private LocalDateTime dataCriacao;
    private List<String> hashtags;
    private Endereco endereco;
    private String imagemURL;
    @NotNull(message = "Usuário é obrigatório")
    private Usuario usuario;

}