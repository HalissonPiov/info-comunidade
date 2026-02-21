package com.ufop.bancodedados.infocomunidade.config.DataLoaders;

import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import com.ufop.bancodedados.infocomunidade.models.Publicacao;
import com.ufop.bancodedados.infocomunidade.repositories.PublicacaoRepository;

import tools.jackson.core.JacksonException;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import org.springframework.stereotype.Component;

@Component
public class PublicacaoDataLoader implements CommandLineRunner{
    
    @Autowired
    private PublicacaoRepository publicacaoRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception{
        if(publicacaoRepository.contar() == 0){
            carregarPublicacoesJson();
        }
        else{
            System.out.println("✓ Publicações já existem no banco. Nenhuma inserção necessária.");
        }
    }

    private void carregarPublicacoesJson(){
        try {
            InputStream inputStream = getClass().getResourceAsStream("/jsons/publicacaoData.json");

            if(inputStream == null){
                System.err.println("Erro!! Arquivo data.json não encontrado em /resources/");
                return;
            }

            List<Publicacao> publicacoes = objectMapper.readValue(inputStream, new TypeReference<List<Publicacao>>() {});

            publicacoes.forEach(publicacao -> publicacaoRepository.salvar(publicacao));

            System.out.println("✓ " + publicacoes.size() + " publicações carregados do JSON com sucesso!");
        }
        catch(JacksonException e){
            System.err.println("✗ Erro!! Não foi possível carregar os publicações do JSON: " + e.getMessage());
        }
    }
}
