package com.ufop.bancodedados.infocomunidade.models;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class Endereco implements Serializable {

    @Id
    private String idEndereco;
    private String rua;
    private String bairro;

}
