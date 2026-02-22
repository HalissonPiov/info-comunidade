package com.ufop.bancodedados.infocomunidade.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.ufop.bancodedados.infocomunidade.repositories.EnderecoRepository;
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

    @Autowired
    private EnderecoRepository enderecoRepository;

    public Publicacao criarInformativo(InformativoDTO informativoDTO){
        var usuario = usuarioService.encontraPorID(informativoDTO.getUsuarioId());
        Endereco endereco = enderecoRepository.buscarPorId(informativoDTO.getEnderecoId());
        
        if(usuario == null){
            throw new IllegalArgumentException("Usuário não encontrado, por isso não é possível criar uma publicacão");
        }

        
        Informativo informativo = new Informativo();
        informativo.setTitulo(informativoDTO.getTitulo());
        informativo.setDescricao(informativoDTO.getDescricao());
        informativo.setHashtags(informativoDTO.getHashtags());
        informativo.setImagemURL(informativoDTO.getImagemURL());
        informativo.setEndereco(endereco);
        informativo.setPublicoAlvo(informativoDTO.getPublicoAlvo());
        informativo.setUsuario(usuario);
        informativo.setDataCriacao(LocalDateTime.now());

        return publicacaoRepository.criar(informativo);
    }

    public Publicacao criarOcorrencia(OcorrenciaDTO ocorrenciaDTO){
        var usuario = usuarioService.encontraPorID(ocorrenciaDTO.getUsuarioId());
        Endereco endereco = enderecoRepository.buscarPorId(ocorrenciaDTO.getEnderecoId());
        
        if(usuario == null){
            throw new IllegalArgumentException("Usuário não encontrado, por isso não é possível criar um publicacão");
        }

        
        Ocorrencia ocorrencia = new Ocorrencia();
        ocorrencia.setTitulo(ocorrenciaDTO.getTitulo());
        ocorrencia.setDescricao(ocorrenciaDTO.getDescricao());
        ocorrencia.setHashtags(ocorrenciaDTO.getHashtags());
        ocorrencia.setImagemURL(ocorrenciaDTO.getImagemURL());
        ocorrencia.setEndereco(endereco);
        ocorrencia.setSetor(ocorrenciaDTO.getSetor());
        ocorrencia.setDataCriacao(LocalDateTime.now());
        ocorrencia.setUsuario(usuario);

        System.out.println(ocorrencia);

        return publicacaoRepository.criar(ocorrencia);
    }

    public void atualizarOcorrencia(String id, OcorrenciaDTO ocorrenciaDTO) {
        Ocorrencia ocorrencia = (Ocorrencia) publicacaoRepository.buscarPorId(id);
        if (ocorrencia == null) {
            throw new IllegalArgumentException("Ocorrência não encontrada");
        }
        Endereco endereco = enderecoRepository.buscarPorId(ocorrenciaDTO.getEnderecoId());

        ocorrencia.setTitulo(ocorrenciaDTO.getTitulo());
        ocorrencia.setDescricao(ocorrenciaDTO.getDescricao());
        ocorrencia.setHashtags(ocorrenciaDTO.getHashtags());
        ocorrencia.setImagemURL(ocorrenciaDTO.getImagemURL());
        ocorrencia.setSetor(ocorrenciaDTO.getSetor());
        ocorrencia.setEndereco(endereco);

        publicacaoRepository.atualizar(id, ocorrencia);
    }

    public void atualizarInformativo(String id, InformativoDTO dto) {
        Informativo informativo = (Informativo) publicacaoRepository.buscarPorId(id);
        if (informativo == null) {
            throw new IllegalArgumentException("Informativo não encontrado");
        }

        Endereco endereco = enderecoRepository.buscarPorId(dto.getEnderecoId());

        informativo.setTitulo(dto.getTitulo());
        informativo.setDescricao(dto.getDescricao());
        informativo.setHashtags(dto.getHashtags());
        informativo.setImagemURL(dto.getImagemURL());
        informativo.setEndereco(endereco);
        informativo.setPublicoAlvo(dto.getPublicoAlvo());

        publicacaoRepository.atualizar(id, informativo);
    }

    public List<Publicacao> buscarTodas(String titulo, String bairro, String rua, String hashtags, String setor, String publicoAlvo, LocalDate dataCriacao) {
        return publicacaoRepository.buscarComFiltros(null, titulo, bairro, rua, hashtags, setor, publicoAlvo, dataCriacao);
    }

    @SuppressWarnings("unchecked")
    public List<Ocorrencia> buscarTodasOcorrencias(String titulo, String bairro, String rua, String hashtags, String setor, LocalDate dataCriacao) {
        List<Publicacao> ocorrencias = publicacaoRepository.buscarComFiltros("ocorrencia", titulo, bairro, rua, hashtags, setor, null, dataCriacao);
        return (List<Ocorrencia>)(List<?>) ocorrencias;
    }

    @SuppressWarnings("unchecked")
    public List<Informativo> buscarTodosInformativos(String titulo, String bairro, String rua, String hashtags, String publicoAlvo, LocalDate dataCriacao) {
        List<Publicacao> informativos = publicacaoRepository.buscarComFiltros("informativo", titulo, bairro, rua, hashtags, null, publicoAlvo, dataCriacao);
        return (List<Informativo>)(List<?>) informativos;
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
