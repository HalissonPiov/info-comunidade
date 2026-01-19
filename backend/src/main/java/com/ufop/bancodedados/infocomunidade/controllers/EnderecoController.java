package com.ufop.bancodedados.infocomunidade.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ufop.bancodedados.infocomunidade.models.Endereco;
import com.ufop.bancodedados.infocomunidade.services.EnderecoService;


@RestController
@RequestMapping("endereco")
public class EnderecoController {

    @Autowired
    public EnderecoService enderecoService;

    @PutMapping("{id}")
    public ResponseEntity<Void> atualizar(@PathVariable String id, @RequestBody Endereco endereco){
        enderecoService.atualizar(id, endereco);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("{id}")
    public ResponseEntity<Endereco> buscarPorId(@PathVariable String id){
        Endereco enderecoId = enderecoService.buscarPorId(id);
        if(enderecoId == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(enderecoId);
    }

    @GetMapping("/rua")
    public ResponseEntity<Endereco> buscarPorRua(@PathVariable String rua){
        Endereco EnderecoRua = enderecoService.buscarPorRua(rua);
        if(EnderecoRua == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(EnderecoRua);
    }

    @GetMapping("/bairro")
    public ResponseEntity<Endereco> buscarPorBairro(@PathVariable String bairro){
        Endereco enderecoBairro = enderecoService.buscarPorBairro(bairro);
        if(enderecoBairro == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(enderecoBairro);
    }

}
