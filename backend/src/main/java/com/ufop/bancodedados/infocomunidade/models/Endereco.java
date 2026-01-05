package com.ufop.bancodedados.infocomunidade.models;

import lombok.Data;

import java.io.Serializable;

@Data
public class Endereco implements Serializable {

    private String idEndereco;
    private String rua;
    private String bairro;
    private String complemento;

}
