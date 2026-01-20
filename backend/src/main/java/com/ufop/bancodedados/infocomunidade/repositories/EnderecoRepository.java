package com.ufop.bancodedados.infocomunidade.repositories;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.stereotype.Repository;

import com.ufop.bancodedados.infocomunidade.models.Endereco;
@Repository
public class EnderecoRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public Endereco buscarPorId(String id){
        String mql = "{ \"_id\" : \"" + id + "\" }";
        return mongoTemplate.findOne(new BasicQuery(mql), Endereco.class, "endereco");
    }

    public List<Endereco> buscarPorRua(String rua){
        String mql = "{ \"rua\" : { \"$regex\" : \"" + rua + "\", \"$options\" : \"i\" } }";
        return mongoTemplate.find(new BasicQuery(mql), Endereco.class, "endereco");
    }

    public List<Endereco> buscarPorBairro(String bairro){
        String mql = "{ \"bairro\" : { \"$regex\" : \"" + bairro + "\", \"$options\" : \"i\" } }";
        return mongoTemplate.find(new BasicQuery(mql), Endereco.class, "endereco");
    }

    public List<Endereco> buscarTodos(){
        String mql = "{}";
        return mongoTemplate.find(new BasicQuery(mql), Endereco.class, "endereco");
    }

}
