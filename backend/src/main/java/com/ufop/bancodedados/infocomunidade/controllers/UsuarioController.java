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

import com.ufop.bancodedados.infocomunidade.models.Usuario;
import com.ufop.bancodedados.infocomunidade.services.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> createUser(@RequestBody Usuario usuario){
        Usuario u = usuarioService.criaUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(u);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> findByID(@PathVariable String id){
        Usuario u = usuarioService.encontrarPorID(id);
        return ResponseEntity.ok().body(u); 
    }

    @GetMapping("/pesquisa/username")
    public ResponseEntity<Usuario> findByUsername(@RequestParam String username) {
        var usuario = usuarioService.encontrarPorUsername(username);
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(usuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUserData(@PathVariable String id,
                                                      @RequestBody Usuario usuario) {
        usuarioService.atualizarUsuario(id, usuario);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        usuarioService.deletarUsuario(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/logical/{id}")
    public ResponseEntity<Void> logicalDeleteUser(@PathVariable String id) {
        usuarioService.deletarLogicamenteUsuario(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    
}
