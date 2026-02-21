package com.ufop.bancodedados.infocomunidade.repositories;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.ufop.bancodedados.infocomunidade.models.Informativo;
import com.ufop.bancodedados.infocomunidade.models.Ocorrencia;
import com.ufop.bancodedados.infocomunidade.models.Publicacao;

import lombok.Data;

@Data
@Repository
public class PublicacaoRepository {

    @Autowired
    private final MongoTemplate mongoTemplate;

    public Publicacao criar(Publicacao publicacao){
        return mongoTemplate.insert(publicacao, "publicacao");
    }

    public Publicacao buscarPorId(String id){
        String mql = "{ \"_id\" : \"" + id + "\" }";
        return mongoTemplate.findOne(new BasicQuery(mql), Publicacao.class, "publicacao");
    }

    public List<Publicacao> buscarComFiltros(
            String tipoClasse,
            String titulo,
            String bairro,
            String rua,
            String hashtags,
            String setor,
            String publicoAlvo,
            LocalDate dataCriacao) {

        List<String> condicoes = new ArrayList<>();

        if (tipoClasse != null && !tipoClasse.isBlank()) {
            condicoes.add("\"_class\": \"" + tipoClasse + "\"");
        }

        if (titulo != null && !titulo.isBlank()) {
            condicoes.add("\"titulo\": { \"$regex\": \"" + titulo + "\", \"$options\": \"i\" }");
        }

        if (bairro != null && !bairro.isBlank()) {
            condicoes.add("\"endereco.bairro\": { \"$regex\": \"" + bairro + "\", \"$options\": \"i\" }");
        }
        if (rua != null && !rua.isBlank()) {
            condicoes.add("\"endereco.rua\": { \"$regex\": \"" + rua + "\", \"$options\": \"i\" }");
        }

        if (hashtags != null && !hashtags.isBlank()) {
            condicoes.add("\"hashtags\": { \"$regex\": \"" + hashtags + "\", \"$options\": \"i\" }");
        }

        if (setor != null && !setor.isBlank()) {
            condicoes.add("\"setor\": { \"$regex\": \"" + setor + "\", \"$options\": \"i\" }");
        }
        if (publicoAlvo != null && !publicoAlvo.isBlank()) {
            condicoes.add("\"publicoAlvo\": { \"$regex\": \"" + publicoAlvo + "\", \"$options\": \"i\" }");
        }

        // Filtro de Data de Criação: Formato yyyy-MM-dd
        if (dataCriacao != null) {
            String inicioDia = dataCriacao.toString() + "T00:00:00Z";
            String fimDia = dataCriacao.toString() + "T23:59:59Z";

            String filtroData = String.format(
                    "\"dataCriacao\": { \"$gte\": { \"$date\": \"%s\" }, \"$lte\": { \"$date\": \"%s\" } }",
                    inicioDia, fimDia
            );
            condicoes.add(filtroData);
        }

        StringBuilder mql = new StringBuilder();
        mql.append("{");
        mql.append(String.join(", ", condicoes)); // Operação and com vírgula
        mql.append("}");

        BasicQuery query = new BasicQuery(mql.toString());
        query.with(Sort.by(Sort.Direction.DESC, "dataCriacao"));

        return mongoTemplate.find(query, Publicacao.class, "publicacao");
    }

    public void atualizar(String id, Publicacao publicacao){
        String mql = "{ \"_id\" : \"" + id + "\" }";

        Update update = new Update()
                .set("titulo", publicacao.getTitulo())
                .set("descricao", publicacao.getDescricao())
                .set("hashtags", publicacao.getHashtags())
                .set("imagemURL", publicacao.getImagemURL())
                .set("endereco", publicacao.getEndereco());

        if(publicacao instanceof Ocorrencia){
            update.set("setor", ((Ocorrencia) publicacao).getSetor());
        } else if (publicacao instanceof Informativo) {
            update.set("publicoAlvo", ((Informativo) publicacao).getPublicoAlvo());
        }

        mongoTemplate.updateFirst(new BasicQuery(mql), update, Publicacao.class, "publicacao");
    }

    public void deletar(String id){
        String mql = "{ \"_id\" : \"" + id + "\" }";
        mongoTemplate.remove(new BasicQuery(mql), Publicacao.class, "publicacao");
    }

    public List<Publicacao> buscarPorHashtags(String hashtags){
        String mql = "{ \"hashtags\" : \"" + hashtags + "\" }";
        return mongoTemplate.find(new BasicQuery(mql), Publicacao.class, "publicacao");
    }

    public List<Publicacao> buscarPorTitulo(String termoNoTitulo){
        String mql = "{ \"titulo\" : { \"$regex\" : \"" + termoNoTitulo + "\", \"$options\" : \"i\" } }";
        return mongoTemplate.find(new BasicQuery(mql), Publicacao.class, "publicacao");
    }

    public List<Publicacao> buscarPorBairroDoEndereco(String bairro){
        String mql = "{ \"endereco.bairro\" : { \"$regex\" : \"" + bairro + "\", \"$options\" : \"i\" } }";
        return mongoTemplate.find(new BasicQuery(mql), Publicacao.class, "publicacao");
    }

    public List<Publicacao> buscarPorIdDoUsuario(String idUsuario){
        String mql = "{ \"usuario._id\" : \"" + idUsuario + "\" }";
        return mongoTemplate.find(new BasicQuery(mql), Publicacao.class, "publicacao");
    }

    public long contar(){
        String mql = "{}";
        return mongoTemplate.count(new BasicQuery(mql), "publicacao");
    }

    public Publicacao salvar(Publicacao publicacao){
        return mongoTemplate.save(publicacao);
    }
}
