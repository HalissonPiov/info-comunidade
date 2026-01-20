package com.ufop.bancodedados.infocomunidade.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ufop.bancodedados.infocomunidade.models.Endereco;
import com.ufop.bancodedados.infocomunidade.repositories.EnderecoRepository;

@Service
public class EnderecoService {

    @Autowired
    public EnderecoRepository enderecoRepository;

    public void atualizar(String id, Endereco endereco ){
      enderecoRepository.atualizar(id, endereco);
    }

    public Endereco buscarPorId(String id){
        return enderecoRepository.buscarPorId(id);
    }

    public List<Endereco> buscarPorRua(String rua){
        return enderecoRepository.buscarPorRua(rua);
    }

    public List<Endereco> buscarPorBairro(String bairro){
        return enderecoRepository.buscarPorBairro(bairro);
    }

    public List<Endereco> buscarTodos(){
        return enderecoRepository.buscarTodos();
    }

}
