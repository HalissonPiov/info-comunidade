package com.ufop.bancodedados.infocomunidade.config.DataLoaders;

import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.ufop.bancodedados.infocomunidade.models.Endereco;
import com.ufop.bancodedados.infocomunidade.repositories.EnderecoRepository;

import tools.jackson.core.JacksonException;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

@Component
public class EnderecoDataLoader implements CommandLineRunner{

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception {
        if(enderecoRepository.contar() == 0){
            carregarEnderecosJson();
        }
        else{
            System.out.println("✓ Endereços já existem no banco. Nenhuma inserção necessária.");
        }
    }

    private void carregarEnderecosJson(){
        try {
            InputStream inputStream = getClass().getResourceAsStream("/jsons/enderecoData.json");

            if(inputStream == null){
                System.err.println("Erro!! Arquivo enderecoData.json não encontrado em /resources/");
                return;
            }

            List<Endereco> enderecos = objectMapper.readValue(inputStream, new TypeReference<List<Endereco>>() {});

            enderecos.forEach(endereco -> enderecoRepository.salvar(endereco));

            System.out.println("✓ " + enderecos.size() + " endereços carregados do JSON com sucesso!");
        }
        catch(JacksonException e){
            System.err.println("✗ Erro!! Não foi possível carregar os endereços do JSON: " + e.getMessage());
        }
    }
}
