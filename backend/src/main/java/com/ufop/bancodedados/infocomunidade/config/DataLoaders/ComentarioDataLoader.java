package com.ufop.bancodedados.infocomunidade.config.DataLoaders;

import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.ufop.bancodedados.infocomunidade.models.Comentario;
import com.ufop.bancodedados.infocomunidade.repositories.ComentarioRepository;

import tools.jackson.core.JacksonException;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

@Component
public class ComentarioDataLoader implements CommandLineRunner{
    @Autowired
    private ComentarioRepository comentarioRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception {
        if(comentarioRepository.contar() == 0){
            carregarEnderecosJson();
        }
        else{
            System.out.println("✓ Comentários já existem no banco. Nenhuma inserção necessária.");
        }
    }

    private void carregarEnderecosJson(){
        try {
            InputStream inputStream = getClass().getResourceAsStream("/jsons/comentarioData.json");

            if(inputStream == null){
                System.err.println("Erro!! Arquivo comentarioData.json não encontrado em /resources/");
                return;
            }

            List<Comentario> comentarios = objectMapper.readValue(inputStream, new TypeReference<List<Comentario>>() {});

            comentarios.forEach(comentario -> comentarioRepository.salvar(comentario));

            System.out.println("✓ " + comentarios.size() + " comentários carregados do JSON com sucesso!");
        }
        catch(JacksonException e){
            System.err.println("✗ Erro!! Não foi possível carregar os comentários do JSON: " + e.getMessage());
        }
    }
}
