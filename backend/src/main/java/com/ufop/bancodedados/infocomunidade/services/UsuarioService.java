package com.ufop.bancodedados.infocomunidade.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ufop.bancodedados.infocomunidade.models.Usuario;
import com.ufop.bancodedados.infocomunidade.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepositorio;

    public Usuario criaUsuario(Usuario usuario){
        if(usuarioRepositorio.existeUsername(usuario.getUsername())){
            throw new RuntimeException("Esse username já tem dono, tente outro!!");
        }
        return usuarioRepositorio.criarUsuario(usuario);
    }

    public Usuario encontrarPorID(String id){
        Usuario usuarioEncontrado = usuarioRepositorio.encontrarPorID(id);
        return usuarioEncontrado;
    }

    public Usuario encontrarPorUsername(String username){
        Usuario usuarioEncontrado = usuarioRepositorio.encontrarPorUsername(username);
        return usuarioEncontrado;
    }

    public void atualizarUsuario(String id, Usuario usuario){
        usuarioRepositorio.atualizarUsuario(id, usuario);
    }

    public void deletarUsuario(String id){
        usuarioRepositorio.deletarPorID(id);
    }

    public void deletarLogicamenteUsuario(String id){
        usuarioRepositorio.deletarLogicamentePorID(id);
    }
}
