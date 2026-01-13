package com.ufop.bancodedados.infocomunidade.controllers;

import com.ufop.bancodedados.infocomunidade.models.Informativo;
import com.ufop.bancodedados.infocomunidade.models.Ocorrencia;
import com.ufop.bancodedados.infocomunidade.models.Publicacao;
import com.ufop.bancodedados.infocomunidade.services.PublicacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@Controller
@RequestMapping("publicacao")
public class PublicacaoController {

    @Autowired
    private PublicacaoService publicacaoService;

    @PostMapping("/ocorrencia")
    public ResponseEntity<Publicacao> criarOcorrencia(@RequestBody Ocorrencia ocorrencia) {
        Publicacao publiOcorrencia = publicacaoService.criar(ocorrencia);
        return ResponseEntity.status(HttpStatus.CREATED).body(publiOcorrencia);
    }

    @PostMapping("/informativo")
    public ResponseEntity<Publicacao> criarInformativo(@RequestBody Informativo informativo) {
        Publicacao publicInformativo = publicacaoService.criar(informativo);
        return ResponseEntity.status(HttpStatus.CREATED).body(publicInformativo);
    }

    @GetMapping
    public ResponseEntity<List<Publicacao>> listarTodas(){
        return ResponseEntity.ok(publicacaoService.listarTodas());
    }

    @PutMapping("/ocorrencia/{id}")
    public ResponseEntity<Void> atualizarOcorrencia(@PathVariable String id, @RequestBody Ocorrencia ocorrencia) {
        publicacaoService.atualizar(id, ocorrencia);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/informativo/{id}")
    public ResponseEntity<Void> atualizarInformativo(@PathVariable String id, @RequestBody Informativo informativo) {
        publicacaoService.atualizar(id, informativo);
        return ResponseEntity.noContent().build();
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

    @GetMapping("/usuario")
    public ResponseEntity<List<Publicacao>> buscarPorIdDoUsuario(@RequestParam String idUsuario){
        List<Publicacao> publiIdUsuario = publicacaoService.buscarPorIdDoUsuario(idUsuario);
        if(publiIdUsuario == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(publiIdUsuario);
    }
}