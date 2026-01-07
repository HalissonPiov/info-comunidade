package com.ufop.bancodedados.infocomunidade.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.ufop.bancodedados.infocomunidade.models.Usuario;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class UsuarioRepository {
    
    @Autowired
    private final MongoTemplate mongoTemplate;

    public Usuario criarUsuario(Usuario usuario){
        return mongoTemplate.insert(usuario, "usuarios");
    }

    public boolean existeUsername(String username) {
        Query query = new Query(Criteria.where("username").is(username));
        return mongoTemplate.exists(query, Usuario.class, "usuarios");
    }

    public Usuario encontrarPorID(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        try {
            Usuario usuario = mongoTemplate.findOne(query, Usuario.class, "usuarios");
            return usuario; 
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public Usuario encontrarPorUsername(String username){
        String mql = "{ \"username\" : \"" + username + "\" }";
        Query query = new BasicQuery(mql);
        try {
            Usuario usuario = mongoTemplate.findOne(query, Usuario.class, "usuarios");
            return usuario;
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public void atualizarUsuario(String id, Usuario usuario){
        Query query = new Query(Criteria.where("_id").is(id));

        Update usuarioAtualizado = new Update()
            .set("nome", usuario.getNome())
            .set("username", usuario.getUsername())
            .set("bairro", usuario.getBairro())
            .set("dataNascimento", usuario.getDataNascimento())
            .set("excluido", usuario.isExcluido());
        
        mongoTemplate.updateFirst(query, usuarioAtualizado, Usuario.class, "usuarios");
    }

    public void deletarPorID(String ID){
        Query query = new Query(Criteria.where("_id").is(ID));
        mongoTemplate.remove(query, Usuario.class, "usuarios");
    }

    public void deletarLogicamentePorID(String ID){
        Query query = new Query(Criteria.where("_id").is(ID));
        Update usuarioExcluido = new Update().set("excluido", true);
        mongoTemplate.updateFirst(query, usuarioExcluido, Usuario.class, "usuarios");
    }
    
}
