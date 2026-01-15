package com.ufop.bancodedados.infocomunidade.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ufop.bancodedados.infocomunidade.models.DTOs.InformativoDTO;
import com.ufop.bancodedados.infocomunidade.models.DTOs.OcorrenciaDTO;
import com.ufop.bancodedados.infocomunidade.models.Endereco;
import com.ufop.bancodedados.infocomunidade.models.Informativo;
import com.ufop.bancodedados.infocomunidade.models.Ocorrencia;
import com.ufop.bancodedados.infocomunidade.models.Publicacao;
import com.ufop.bancodedados.infocomunidade.repositories.PublicacaoRepository;

@Service
public class PublicacaoService {

    @Autowired
    private PublicacaoRepository publicacaoRepository;

    @Autowired
    private UsuarioService usuarioService;

    public Publicacao criarInformativo(InformativoDTO informativoDTO){
        var usuario = usuarioService.encontraPorID(informativoDTO.getUsuarioId());
        Endereco endereco = null;
        
        if(usuario == null){
            throw new IllegalArgumentException("Usuário não encontrado, por isso não é possível criar um publicacão");
        }

        if(informativoDTO.getEnderecoId() != null){
            //aqui vai ter a funcao de buscar por endereco via id quando tiver pronta
            if(endereco == null){
                throw new IllegalArgumentException("Endereço passado não encontrado, por isso não é possível criar um publicacão");
            }
        }
        
        Informativo informativo = new Informativo();
        informativo.setTitulo(informativoDTO.getTitulo());
        informativo.setDescricao(informativoDTO.getDescricao());
        informativo.setHashtags(informativoDTO.getHashtags());
        informativo.setImagemURL(informativoDTO.getImagemURL());
        informativo.setEndereco(endereco);  // pode ficar null
        informativo.setPublicoAlvo(informativoDTO.getPublicoAlvo());
        informativo.setUsuario(usuario);
        informativo.setDataCriacao(LocalDateTime.now());

        return publicacaoRepository.criar(informativo);
    }

    public Publicacao criarOcorrencia(OcorrenciaDTO ocorrenciaDTO){
        var usuario = usuarioService.encontraPorID(ocorrenciaDTO.getUsuarioId());
        Endereco endereco = null;
        
        if(usuario == null){
            throw new IllegalArgumentException("Usuário não encontrado, por isso não é possível criar um publicacão");
        }

        if(ocorrenciaDTO.getEnderecoId() != null){
            //aqui vai ter a funcao de buscar por endereco via id quando tiver pronta
            if(endereco == null){
                throw new IllegalArgumentException("Endereço passado não encontrado, por isso não é possível criar um publicacão");
            }
        }
        
        Ocorrencia ocorrencia = new Ocorrencia();
        ocorrencia.setTitulo(ocorrenciaDTO.getTitulo());
        ocorrencia.setDescricao(ocorrenciaDTO.getDescricao());
        ocorrencia.setHashtags(ocorrenciaDTO.getHashtags());
        ocorrencia.setImagemURL(ocorrenciaDTO.getImagemURL());
        ocorrencia.setEndereco(endereco);  // pode ficar null
        ocorrencia.setSetor(ocorrenciaDTO.getSetor());
        ocorrencia.setUsuario(usuario);
        ocorrencia.setDataCriacao(LocalDateTime.now());

        return publicacaoRepository.criar(ocorrencia);
    }

    public List<Publicacao> listarTodas() {
        return publicacaoRepository.buscarTodas();
    }

    public void atualizarOcorrencia(String id, OcorrenciaDTO ocorrenciaDTO) {
        Ocorrencia ocorrencia = (Ocorrencia) publicacaoRepository.buscarPorId(id);
        if (ocorrencia == null) {
            throw new IllegalArgumentException("Ocorrência não encontrada");
        }

        ocorrencia.setTitulo(ocorrenciaDTO.getTitulo());
        ocorrencia.setDescricao(ocorrenciaDTO.getDescricao());
        ocorrencia.setHashtags(ocorrenciaDTO.getHashtags());
        ocorrencia.setImagemURL(ocorrenciaDTO.getImagemURL());

        if (ocorrenciaDTO.getEnderecoId() != null) {
            //aqui vai ter a funcao de buscar por endereco via id quando tiver pronta
            //if (endereco == null) {
                //throw new IllegalArgumentException("Endereço não encontrado");
            //}
            //existente.setEndereco(endereco);
        }

        ocorrencia.setSetor(ocorrenciaDTO.getSetor());

        publicacaoRepository.atualizar(id, ocorrencia);
    }

    public void atualizarInformativo(String id, InformativoDTO dto) {
        Informativo informativo = (Informativo) publicacaoRepository.buscarPorId(id);
        if (informativo == null) {
            throw new IllegalArgumentException("Informativo não encontrado");
        }

        informativo.setTitulo(dto.getTitulo());
        informativo.setDescricao(dto.getDescricao());
        informativo.setHashtags(dto.getHashtags());
        informativo.setImagemURL(dto.getImagemURL());

        if (dto.getEnderecoId() != null) {
            //aqui vai ter a funcao de buscar por endereco via id quando tiver pronta
            //if (endereco == null) {
                //throw new IllegalArgumentException("Endereço não encontrado");
            //}
            //existente.setEndereco(endereco);
        }

        informativo.setPublicoAlvo(dto.getPublicoAlvo());

        publicacaoRepository.atualizar(id, informativo);
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
