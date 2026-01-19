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

import com.ufop.bancodedados.infocomunidade.models.Comentario;
import com.ufop.bancodedados.infocomunidade.models.DTOs.ComentarioDTO;
import com.ufop.bancodedados.infocomunidade.services.ComentarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("comentarios")
public class ComentarioController {

    @Autowired
    private ComentarioService comentarioService;

    @PostMapping
    public ResponseEntity<Comentario> criarComentario(@Valid @RequestBody ComentarioDTO comentario){
        Comentario comentarioNovo = comentarioService.criaComentario(comentario);
        return ResponseEntity.status(HttpStatus.CREATED).body(comentarioNovo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comentario> encontrarPeloID(@PathVariable String id){
        Comentario comentario = comentarioService.encontraPorID(id);
        if(comentario == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(comentario);
    }

    @GetMapping("/por-usuario/username")
    public ResponseEntity<List<Comentario>> encontrarPeloUsername (@RequestParam String username) {
        List<Comentario> comentarios = comentarioService.encontraPorUsuarioUsername(username);
        if (comentarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(comentarios);
    }

    @GetMapping("/por-usuario/{id}")
    public ResponseEntity<List<Comentario>> encontrarPeloUsuarioID (@PathVariable String id) {
        List<Comentario> comentarios = comentarioService.encontraPorUsuarioID(id);
        if (comentarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(comentarios);
    }
    
    @GetMapping("/por-publicacao/titulo")
    public ResponseEntity<List<Comentario>> encontrarPeloTituloPublicacao (@RequestParam String titulo) {
        List<Comentario> comentarios = comentarioService.encontraPorTituloPublicacao(titulo);
        if (comentarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(comentarios);
    }

    @GetMapping("/por-publicacao/{id}")
    public ResponseEntity<List<Comentario>> encontrarPelaPublicacaoID (@PathVariable String id) {
        List<Comentario> comentarios = comentarioService.encontraPorPublicacaoID(id);
        if (comentarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(comentarios);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comentario> atualizarComentario(@PathVariable String id, @RequestBody ComentarioDTO comentarioDTO){
        Comentario comentarioAtulizado = comentarioService.atualizaComentario(id, comentarioDTO);
        return ResponseEntity.ok().body(comentarioAtulizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarComentarioID(@PathVariable String id) {
        comentarioService.deletaComentario(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/logical/{id}")
    public ResponseEntity<Void> deletarLogicamenteComentarioID(@PathVariable String id) {
        comentarioService.deletaLogicamenteComentario(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
