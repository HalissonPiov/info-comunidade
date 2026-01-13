package com.ufop.bancodedados.infocomunidade.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "publicacao")
public abstract class Publicacao implements Serializable {

    @Id
    private String idPublicacao;

    private String titulo;
    private String descricao;
    private LocalDateTime dataCriacao;
    private List<String> hashtags;
    private Endereco endereco;
    private String imagemURL;
    private Usuario usuario;

}