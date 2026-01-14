package com.ufop.bancodedados.infocomunidade.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.mongodb.client.result.UpdateResult;
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
        String mql = "{ \"username\" : \"" + username + "\" }";
        return mongoTemplate.exists(new BasicQuery(mql), Usuario.class, "usuarios");
    }

    public Usuario encontrarPorID(String id) {
        String mql = "{ \"_id\" : \"" + id + "\" }";
        try {
            Usuario usuario = mongoTemplate.findOne(new BasicQuery(mql), Usuario.class, "usuarios");
            return usuario;
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public Usuario encontrarPorUsername(String username){
        String mql = "{ \"username\" : \"" + username + "\" }";
        try {
            Usuario usuario = mongoTemplate.findOne(new BasicQuery(mql), Usuario.class, "usuarios");
            return usuario;
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public Usuario atualizarUsuario(String id, Usuario usuario) {
        String mql = "{ \"_id\" : \"" + id + "\" }";
        Update usuarioAtualizado = new Update()
            .set("nome", usuario.getNome())
            .set("username", usuario.getUsername())
            .set("bairro", usuario.getBairro())
            .set("dataNascimento", usuario.getDataNascimento())
            .set("excluido", usuario.isExcluido());

        UpdateResult atualizaUsuario = mongoTemplate.updateFirst(new BasicQuery(mql), usuarioAtualizado, Usuario.class, "usuarios");

        if(atualizaUsuario.getMatchedCount() == 0){
            return null;
        }

        return mongoTemplate.findOne(new BasicQuery(mql), Usuario.class, "usuarios");
    }

    public void deletarPorID(String id) {
        String mql = "{ \"_id\" : \"" + id + "\" }";
        mongoTemplate.remove(new BasicQuery(mql), Usuario.class, "usuarios");
    }

    public void deletarPorUsername(String username) {
        String mql = "{ \"username\" : \"" + username + "\" }";
        mongoTemplate.remove(new BasicQuery(mql), Usuario.class, "usuarios");
    }

    public void deletarLogicamentePorID(String id) {
        String mql = "{ \"_id\" : \"" + id + "\" }";
        Update usuarioExcluido = new Update().set("excluido", true);
        mongoTemplate.updateFirst(new BasicQuery(mql), usuarioExcluido, Usuario.class, "usuarios");
    }
    
    public void deletarLogicamentePorUsername(String username) {
        String mql = "{ \"username\" : \"" + username + "\" }";
        Update usuarioExcluido = new Update().set("excluido", true);
        mongoTemplate.updateFirst(new BasicQuery(mql), usuarioExcluido, Usuario.class, "usuarios");
    }

}
