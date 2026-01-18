package com.ufop.bancodedados.infocomunidade.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.ufop.bancodedados.infocomunidade.models.Informativo;
import com.ufop.bancodedados.infocomunidade.models.Ocorrencia;
import com.ufop.bancodedados.infocomunidade.models.Publicacao;

import lombok.Data;

@Data
@Repository
public class PublicacaoRepository {

    @Autowired
    private final MongoTemplate mongoTemplate;

    public Publicacao criar(Publicacao publicacao){
        return mongoTemplate.insert(publicacao, "publicacao");
    }

    public Publicacao buscarPorId(String id){
        String mql = "{ \"_id\" : \"" + id + "\" }";
        return mongoTemplate.findOne(new BasicQuery(mql), Publicacao.class, "publicacao");
    }

    public List<Publicacao> buscarTodas(){
        String mql = "{}";
        BasicQuery query = new BasicQuery(mql);

        query.with(org.springframework.data.domain.Sort.by(
                org.springframework.data.domain.Sort.Direction.DESC, "dataCriacao"
        ));

        return mongoTemplate.find(query, Publicacao.class, "publicacao");
    }

    public void atualizar(String id, Publicacao publicacao){
        String mql = "{ \"_id\" : \"" + id + "\" }";

        Update update = new Update()
                .set("titulo", publicacao.getTitulo())
                .set("descricao", publicacao.getDescricao())
                .set("hashtags", publicacao.getHashtags())
                .set("imagemURL", publicacao.getImagemURL())
                .set("endereco", publicacao.getEndereco());

        if(publicacao instanceof Ocorrencia){
            update.set("setor", ((Ocorrencia) publicacao).getSetor());
        } else if (publicacao instanceof Informativo) {
            update.set("publicoAlvo", ((Informativo) publicacao).getPublicoAlvo());
        }

        mongoTemplate.updateFirst(new BasicQuery(mql), update, Publicacao.class, "publicacao");
    }

    public void deletar(String id){
        String mql = "{ \"_id\" : \"" + id + "\" }";
        mongoTemplate.remove(new BasicQuery(mql), Publicacao.class, "publicacao");
    }

    public List<Publicacao> buscarPorHashtags(String hashtags){
        String mql = "{ \"hashtags\" : \"" + hashtags + "\" }";
        return mongoTemplate.find(new BasicQuery(mql), Publicacao.class, "publicacao");
    }

    public List<Publicacao> buscarPorTitulo(String termoNoTitulo){
        String mql = "{ \"titulo\" : { \"$regex\" : \"" + termoNoTitulo + "\", \"$options\" : \"i\" } }";
        return mongoTemplate.find(new BasicQuery(mql), Publicacao.class, "publicacao");
    }

    public List<Publicacao> buscarPorBairroDoEndereco(String bairro){
        String mql = "{ \"endereco.bairro\" : { \"$regex\" : \"" + bairro + "\", \"$options\" : \"i\" } }";
        return mongoTemplate.find(new BasicQuery(mql), Publicacao.class, "publicacao");
    }

    public List<Publicacao> buscarPorIdDoUsuario(String idUsuario){
        String mql = "{ \"usuario._id\" : \"" + idUsuario + "\" }";
        return mongoTemplate.find(new BasicQuery(mql), Publicacao.class, "publicacao");
    }
}
