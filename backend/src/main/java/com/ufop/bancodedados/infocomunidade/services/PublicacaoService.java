package com.ufop.bancodedados.infocomunidade.services;

import com.ufop.bancodedados.infocomunidade.models.Publicacao;
import com.ufop.bancodedados.infocomunidade.repositories.PublicacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;


@Service
public class PublicacaoService {

    @Autowired
    private PublicacaoRepository publicacaoRepository;

    public Publicacao criar(Publicacao publicacao){
        publicacao.setDataCriacao(LocalDateTime.now());
        return publicacaoRepository.criar(publicacao);
    }

    public List<Publicacao> listarTodas() {
        return publicacaoRepository.buscarTodas();
    }

    public void atualizar(String id, Publicacao publicacao) {
        publicacaoRepository.atualizar(id, publicacao);
    }

    public void deletar(String id) {
        publicacaoRepository.deletar(id);
    }

    public Publicacao buscarPorId(String id) {
        return publicacaoRepository.buscarPorId(id);
    }

    public List<Publicacao> buscarPorTitulo(String termoNoTitulo) {
        return publicacaoRepository.buscarPorTitulo(termoNoTitulo);
    }

    public List<Publicacao> buscarPorBairroDoEndereco(String bairro) {
        return publicacaoRepository.buscarPorBairroDoEndereco(bairro);
    }

    public List<Publicacao> buscarPorHashtags(String hashtags) {
        return publicacaoRepository.buscarPorHashtags(hashtags);
    }

    public List<Publicacao> buscarPorIdDoUsuario(String idUsuario) {
        return publicacaoRepository.buscarPorIdDoUsuario(idUsuario);
    }

}
