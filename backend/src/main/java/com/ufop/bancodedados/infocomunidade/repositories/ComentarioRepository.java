package com.ufop.bancodedados.infocomunidade.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.mongodb.client.result.UpdateResult;
import com.ufop.bancodedados.infocomunidade.models.Comentario;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class ComentarioRepository {

    @Autowired
    private final MongoTemplate mongoTemplate;

    public Comentario criarComentario(Comentario comentario){
        return mongoTemplate.insert(comentario, "comentarios");
    }

    public Comentario encontrarPorID(String id){
        String mql = "{ \"_id\" : \"" + id + "\" }";
        try {
            Comentario comentario = mongoTemplate.findOne(new BasicQuery(mql), Comentario.class, "comentarios");
            return comentario; 
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<Comentario> encontrarPorUsuarioUsername(String username){
        String mql = "{ \"usuario.username\" : \"" + username + "\" }";
        return mongoTemplate.find(new BasicQuery(mql), Comentario.class, "comentarios");
    }

    public List<Comentario> encontrarPorUsuarioID(String usuarioID){
        String mql = "{ \"usuario._id\" : \"" + usuarioID + "\" }";
        return mongoTemplate.find(new BasicQuery(mql), Comentario.class, "comentarios");
    }

    public List<Comentario> encontrarPorTituloPublicacao(String titulo){
        String mql = "{ \"publicacao.titulo\" : \"" + titulo + "\" }";
        return mongoTemplate.find(new BasicQuery(mql), Comentario.class, "comentarios");
    }

    public List<Comentario> encontrarPorPublicacaoID(String publicacaoID){
        String mql = "{ \"publicacao.idPublicacao\" : \"" + publicacaoID + "\" }";
        return mongoTemplate.find(new BasicQuery(mql), Comentario.class, "comentarios");
    }

    public Comentario atualizarComentario(String id, Comentario comentario){
        String mql = "{ \"_id\" : \"" + id + "\" }";
        Update comentarioAtualizado = new Update()
            .set("texto", comentario.getTexto())
            .set("excluido", comentario.isExcluido());
        
        UpdateResult atualizaComentario = mongoTemplate.updateFirst(new BasicQuery(mql), comentarioAtualizado, Comentario.class, "comentarios");

        if(atualizaComentario.getMatchedCount() == 0){
            return null;
        }

        return mongoTemplate.findOne(new BasicQuery(mql), Comentario.class, "comentarios");
    }

    public void deletarPorID(String id){
        String mql = "{ \"_id\" : \"" + id + "\" }";
        mongoTemplate.remove(new BasicQuery(mql), Comentario.class, "comentarios");
    }

    public void deletarLogicamentePorID(String id){
        String mql = "{ \"_id\" : \"" + id + "\" }";
        Update comentarioExcluido = new Update().set("excluido", true);
        mongoTemplate.updateFirst(new BasicQuery(mql), comentarioExcluido, Comentario.class, "comentarios");
    }
}
