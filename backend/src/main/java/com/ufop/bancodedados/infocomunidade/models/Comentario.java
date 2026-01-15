package com.ufop.bancodedados.infocomunidade.models;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection="comentarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comentario implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private String id;
    private String texto;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dataCriacao;
    @NotNull(message = "Usuário é obrigatório")
    private Usuario usuario;
    @NotNull(message = "Publicação é obrigatória")
    private Publicacao publicacao;
    private boolean excluido;

}
