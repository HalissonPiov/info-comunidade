package com.ufop.bancodedados.infocomunidade.controllers;

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

import com.ufop.bancodedados.infocomunidade.models.DTOs.LoginDTO;
import com.ufop.bancodedados.infocomunidade.models.Usuario;
import com.ufop.bancodedados.infocomunidade.services.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario){
        Usuario usuarioNovo = usuarioService.criaUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioNovo);
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> verificarLogin(@RequestBody LoginDTO login){
        Usuario usuario = usuarioService.verificaLogin(login);
        return ResponseEntity.ok(usuario);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> encontrarPeloID(@PathVariable String id){
        Usuario usuario = usuarioService.encontraPorID(id);
        return ResponseEntity.ok().body(usuario); 
    }

    @GetMapping("/pesquisa/username")
    public ResponseEntity<Usuario> encontrarPeloUsername(@RequestParam String username) {
        var usuario = usuarioService.encontraPorUsername(username);
        if(usuario == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(usuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable String id, @RequestBody Usuario usuario) {
        Usuario usuarioAtualizado = usuarioService.atualizaUsuario(id, usuario);
        return ResponseEntity.ok(usuarioAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuarioID(@PathVariable String id) {
        usuarioService.deletaUsuario(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/logical/{id}")
    public ResponseEntity<Void> deletarLogicamenteUsuarioID(@PathVariable String id) {
        usuarioService.deletaLogicamenteUsuario(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    
}
