package com.ufop.bancodedados.infocomunidade.models;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Document(collection = "publicacao")
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "_class"
)
@JsonSubTypes(
    {
        @JsonSubTypes.Type(value = Ocorrencia.class, name = "ocorrencia"),
        @JsonSubTypes.Type(value = Informativo.class, name = "informativo")
    }
)
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