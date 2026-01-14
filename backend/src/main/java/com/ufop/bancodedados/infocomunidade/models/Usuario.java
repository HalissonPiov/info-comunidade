package com.ufop.bancodedados.infocomunidade.models;

import java.io.Serializable;
import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Document(collection="usuarios")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Usuario implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @EqualsAndHashCode.Include
    private String id;
    private String nome;
    @EqualsAndHashCode.Include
    private String username;
    private String senha;
    private String bairro;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataNascimento;
    private boolean excluido;

    public Usuario(String nome, String username, String bairro){
        this.nome = nome;
        this.username = username;
        this.bairro = bairro;
        this.excluido = false;
    }
}
