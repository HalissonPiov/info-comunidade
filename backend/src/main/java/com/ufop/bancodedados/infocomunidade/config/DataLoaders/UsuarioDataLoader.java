package com.ufop.bancodedados.infocomunidade.config.DataLoaders;

import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.ufop.bancodedados.infocomunidade.models.Usuario;
import com.ufop.bancodedados.infocomunidade.repositories.UsuarioRepository;

import tools.jackson.core.JacksonException;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

@Component
public class UsuarioDataLoader implements CommandLineRunner{
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception {
        if(usuarioRepository.contar() == 0){
            carregarUsuariosJson();
        }
        else{
            System.out.println("✓ Usuários já existem no banco. Nenhuma inserção necessária.");
        }
    }

    private void carregarUsuariosJson(){
        try {
            InputStream inputStream = getClass().getResourceAsStream("/jsons/usuarioData.json");

            if(inputStream == null){
                System.err.println("Erro!! Arquivo data.json não encontrado em /resources/");
                return;
            }

            List<Usuario> usuarios = objectMapper.readValue(inputStream, new TypeReference<List<Usuario>>() {});

            usuarios.forEach(usuario -> usuarioRepository.salvar(usuario));

            System.out.println("✓ " + usuarios.size() + " usuários carregados do JSON com sucesso!");
        }
        catch(JacksonException e){
            System.err.println("✗ Erro!! Não foi possível carregar os usuários do JSON: " + e.getMessage());
        }
    }
}
