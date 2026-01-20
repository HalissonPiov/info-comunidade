package com.ufop.bancodedados.infocomunidade.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ufop.bancodedados.infocomunidade.models.Endereco;
import com.ufop.bancodedados.infocomunidade.services.EnderecoService;


@RestController
@RequestMapping("enderecos")
public class EnderecoController {

    @Autowired
    public EnderecoService enderecoService;

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizar(@PathVariable String id, @RequestBody Endereco endereco){
        enderecoService.atualizar(id, endereco);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Endereco> buscarPorId(@PathVariable String id){
        Endereco enderecoId = enderecoService.buscarPorId(id);
        if(enderecoId == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(enderecoId);
    }

    @GetMapping("/rua")
    public ResponseEntity<List<Endereco>> buscarPorRua(@RequestParam String rua){
        List<Endereco> enderecoRua = enderecoService.buscarPorRua(rua);
        if(enderecoRua == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(enderecoRua);
    }

    @GetMapping("/bairro")
    public ResponseEntity<List<Endereco>> buscarPorBairro(@RequestParam String bairro){
        List<Endereco> enderecoBairro = enderecoService.buscarPorBairro(bairro);
        if(enderecoBairro == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(enderecoBairro);
    }

}
