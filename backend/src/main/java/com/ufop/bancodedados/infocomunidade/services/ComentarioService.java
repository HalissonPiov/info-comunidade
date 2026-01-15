package com.ufop.bancodedados.infocomunidade.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ufop.bancodedados.infocomunidade.models.Comentario;
import com.ufop.bancodedados.infocomunidade.models.DTOs.ComentarioDTO;
import com.ufop.bancodedados.infocomunidade.repositories.ComentarioRepository;

@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepositorio;

    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private PublicacaoService publicacaoService;

    public Comentario criaComentario(ComentarioDTO comentarioDTO){
        var usuario = usuarioService.encontraPorID(comentarioDTO.getUsuarioID());
        var publicacao = publicacaoService.buscarPorId(comentarioDTO.getPublicacaoID());

        if(usuario == null){
            throw new IllegalArgumentException("Usuário não encontrado, por isso não é possível criar um comentário");
        }

        if(publicacao == null){
            throw new IllegalArgumentException("Publicação original não encontrada, por isso não é possível criar um comentário");
        }

        Comentario comentario = new Comentario();
        comentario.setTexto(comentarioDTO.getTexto());
        comentario.setUsuario(usuario);     
        comentario.setPublicacao(publicacao);
        comentario.setDataCriacao(LocalDateTime.now());
        comentario.setExcluido(false);

        return comentarioRepositorio.criarComentario(comentario);
    }

    public Comentario encontraPorID(String id){
        Comentario comentario = comentarioRepositorio.encontrarPorID(id);
        return comentario; 
    }

    public List<Comentario> encontraPorUsuarioUsername(String username){
        return comentarioRepositorio.encontrarPorUsuarioUsername(username);
    }

    public List<Comentario> encontraPorUsuarioID(String id){
        return comentarioRepositorio.encontrarPorUsuarioID(id);
    }

    public List<Comentario> encontraPorTituloPublicacao(String titulo){
        return comentarioRepositorio.encontrarPorTituloPublicacao(titulo);
    }
    
    public List<Comentario> encontraPorPublicacaoID(String publicacaoID){
        return comentarioRepositorio.encontrarPorPublicacaoID(publicacaoID);
    }

    public Comentario atualizaComentario(String id, ComentarioDTO comentarioDTO){
        Comentario comentario = comentarioRepositorio.encontrarPorID(id);
        if(comentario == null){
            return null; 
        }
        comentario.setTexto(comentarioDTO.getTexto());
        comentario.setExcluido(comentarioDTO.isExcluido());

        return comentarioRepositorio.atualizarComentario(id, comentario);
    }

    public void deletaComentario(String id){
        comentarioRepositorio.deletarPorID(id);
    }

    public void deletaLogicamenteComentario(String id){
        comentarioRepositorio.deletarLogicamentePorID(id);
    }
}
