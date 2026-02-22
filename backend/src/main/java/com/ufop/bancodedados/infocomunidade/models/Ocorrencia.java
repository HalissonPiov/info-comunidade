package com.ufop.bancodedados.infocomunidade.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.TypeAlias;

@Data
@EqualsAndHashCode(callSuper = true)
@TypeAlias("ocorrencia")
public class Ocorrencia extends Publicacao{

    private String setor;

}
