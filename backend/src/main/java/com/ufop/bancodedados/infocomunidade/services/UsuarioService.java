package com.ufop.bancodedados.infocomunidade.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ufop.bancodedados.infocomunidade.models.DTOs.LoginDTO;
import com.ufop.bancodedados.infocomunidade.models.Usuario;
import com.ufop.bancodedados.infocomunidade.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepositorio;

    public Usuario criaUsuario(Usuario usuario){
        if(usuarioRepositorio.existeUsername(usuario.getUsername())){
            throw new RuntimeException("Esse username já tem dono, tente outro!!");
        }
        return usuarioRepositorio.criarUsuario(usuario);
    }

    public Usuario encontraPorID(String id){
        Usuario usuarioEncontrado = usuarioRepositorio.encontrarPorID(id);
        return usuarioEncontrado;
    }

    public Usuario encontraPorUsername(String username){
        Usuario usuarioEncontrado = usuarioRepositorio.encontrarPorUsername(username);
        if (usuarioEncontrado == null) {
            return null;
        }
        return usuarioEncontrado;
    }

    public Usuario atualizaUsuario(String id, Usuario usuario){
        Usuario usuarioAtualizado = usuarioRepositorio.atualizarUsuario(id, usuario);
        return usuarioAtualizado;
    }

    public void deletaUsuario(String id){
        usuarioRepositorio.deletarPorID(id);
    }

    public void deletaLogicamenteUsuario(String id){
        usuarioRepositorio.deletarLogicamentePorID(id);
    }

    public Usuario verificaLogin(LoginDTO login){
        Usuario usuario = usuarioRepositorio.autenticarLogin(login.username(), login.senha());
        if(usuario == null){
            throw new RuntimeException("Email e/ou senha estão incorretos, tente novamente!");
        }
        return usuario;
    }
}
