package com.ufop.bancodedados.infocomunidade.models;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.io.Serializable;

@Data
public class Endereco implements Serializable {

    @Id
    private String idEndereco;

    private String rua;
    private String bairro;
    private String complemento;

}
