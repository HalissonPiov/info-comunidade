package com.ufop.bancodedados.infocomunidade.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.TypeAlias;

@Data
@EqualsAndHashCode(callSuper = true)
@TypeAlias("informativo")
public class Informativo extends Publicacao{

    private String publicoAlvo;

}
