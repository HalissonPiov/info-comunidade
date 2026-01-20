package com.ufop.bancodedados.infocomunidade.models;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection="endereco")
public class Endereco implements Serializable {

    @Id
    private String id;
    private String bairro;
    private String rua;

}
