package com.ufop.bancodedados.infocomunidade.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ufop.bancodedados.infocomunidade.models.DTOs.InformativoDTO;
import com.ufop.bancodedados.infocomunidade.models.DTOs.OcorrenciaDTO;
import com.ufop.bancodedados.infocomunidade.models.Publicacao;
import com.ufop.bancodedados.infocomunidade.services.PublicacaoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("publicacao")
public class PublicacaoController {

    @Autowired
    private PublicacaoService publicacaoService;

    @PostMapping("/ocorrencia")
    public ResponseEntity<Publicacao> criarOcorrencia(@Valid @RequestBody OcorrenciaDTO ocorrenciaDTO){
        Publicacao pubOcorrencia = publicacaoService.criarOcorrencia(ocorrenciaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(pubOcorrencia);
    }

    @PostMapping("/informativo")
    public ResponseEntity<Publicacao> criarInformativo(@Valid @RequestBody InformativoDTO informativoDTO){
        Publicacao pubInformativo = publicacaoService.criarInformativo(informativoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(pubInformativo);
    }

    @PutMapping("/ocorrencia/{id}")
    public ResponseEntity<Void> atualizarOcorrencia(@PathVariable String id, @RequestBody OcorrenciaDTO ocorrenciaDTO) {
        publicacaoService.atualizarOcorrencia(id, ocorrenciaDTO);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/informativo/{id}")
    public ResponseEntity<Void> atualizarInformativo(@PathVariable String id, @RequestBody InformativoDTO informativoDTO) {
        publicacaoService.atualizarInformativo(id, informativoDTO);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Publicacao>> buscarTodas(){
        return ResponseEntity.ok(publicacaoService.buscarTodas());
    }

    @GetMapping("/ocorrencia")
    public ResponseEntity<List<OcorrenciaDTO>> buscarTodasOcorrencias(){
        return ResponseEntity.ok(publicacaoService.buscarTodasOcorrencias());
    }

    @GetMapping("informativo")
    public ResponseEntity<List<InformativoDTO>> buscarTodosInformativos(){
        return ResponseEntity.ok(publicacaoService.buscarTodosInformativo());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id){
        publicacaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Publicacao> buscarPorId(@PathVariable String id){
        Publicacao publiId = publicacaoService.buscarPorId(id);
        if(publiId == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(publiId);
    }

    @GetMapping("/titulo")
    public ResponseEntity<List<Publicacao>> buscarPorTitulo(@RequestParam String termoTitulo){
        List<Publicacao> publiTitulo = publicacaoService.buscarPorTitulo(termoTitulo);
        if(publiTitulo == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(publiTitulo);
    }

    @GetMapping("/bairro")
    public ResponseEntity<List<Publicacao>> buscarPorBairroDoEndereco(@RequestParam String nomeBairro){
        List<Publicacao> publiBairro = publicacaoService.buscarPorBairroDoEndereco(nomeBairro);
        if(publiBairro == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(publiBairro);
    }

    @GetMapping("/hashtags")
    public ResponseEntity<List<Publicacao>> buscarPorHashtags(@RequestParam String nomeHashtags){
        List<Publicacao> publiHashtags = publicacaoService.buscarPorHashtags(nomeHashtags);
        if(publiHashtags == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(publiHashtags);
    }

    @GetMapping("/por-usuario/{idUsuario}")
    public ResponseEntity<List<Publicacao>> buscarPorIdDoUsuario(@PathVariable String idUsuario){
        List<Publicacao> publiIdUsuario = publicacaoService.buscarPorIdDoUsuario(idUsuario);
        if(publiIdUsuario == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(publiIdUsuario);
    }
}