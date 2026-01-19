package com.ufop.bancodedados.infocomunidade.repositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.ufop.bancodedados.infocomunidade.models.Endereco;
@Repository
public class EnderecoRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public void atualizar(String id, Endereco endereco){
        String mql = "{ \"_id\" : \"" + id + "\" }";

        Update update = new Update()
                .set("rua", endereco.getRua())
                .set("bairro", endereco.getBairro());

        mongoTemplate.updateFirst(new BasicQuery(mql), update, Endereco.class, "endereco");
    }

    public Endereco buscarPorId(String id){
        String mql = "{ \"_id\" : \"" + id + "\" }";
        return mongoTemplate.findOne(new BasicQuery(mql), Endereco.class, "endereco");
    }

    public Endereco buscarPorRua(String rua){
        String mql = "{ \"rua\" : { \"$regex\" : \"" + rua + "\", \"$options\" : \"i\" } }";
        return mongoTemplate.findOne(new BasicQuery(mql), Endereco.class, "endereco");
    }

    public Endereco buscarPorBairro(String bairro){
        String mql = "{ \"bairro\" : { \"$regex\" : \"" + bairro + "\", \"$options\" : \"i\" } }";
        return mongoTemplate.findOne(new BasicQuery(mql), Endereco.class, "endereco");
    }

}
