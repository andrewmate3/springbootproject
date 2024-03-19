package com.tsi.gilligan.andrew;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import com.opencsv.CSVWriter;

import javax.swing.text.html.Option;
import java.io.OutputStreamWriter;

@Service
public class ActorService {
    @Autowired
    private ActorRepository actorRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Iterable<Actor> getAllActors(){
        return actorRepository.findAll();
    }


    public Actor getActorByID(Integer id){
        return actorRepository.findById(id).orElse(null);
    }

    public Actor saveOrUpdateActor(Actor actor){
        return actorRepository.save(actor);
    }

    public void deleteActor(Integer id){
        actorRepository.deleteById(id);
    }

    public Iterable<Actor> sortActors(){
        Iterable<Actor> actors = actorRepository.findAll();
        List<Actor> result = StreamSupport.stream(actors.spliterator(), false)
                .toList();
        return result.stream()
                .sorted(Comparator.comparing(Actor::getFirstName))
                .collect(Collectors.toList());
    }

    public ByteArrayInputStream exportToCSV() throws IOException {
        Iterable<Actor> allActors = actorRepository.findAll();
        String [] Headers = {"ID", "Name"};
        try(
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                CSVWriter csvWriter = new CSVWriter(new OutputStreamWriter(out))
                ) {

            csvWriter.writeNext(Headers);
            for(Actor actor : allActors){
                csvWriter.writeNext(new String[] {String.valueOf(actor.getActorID()), actor.getFirstName(), actor.getLastName()});
            }
            csvWriter.flush();
            return new ByteArrayInputStream(out.toByteArray());
        }
    }

    public List<Film> findFilmByActorID(Integer actorID){
        Optional<Actor> actorOptional = actorRepository.findById(actorID);
        if(actorOptional.isPresent()){
            Actor actor = actorOptional.get();
            return new ArrayList<>(actor.getFilms());
        }
        return Collections.emptyList();
    }

    public List<Film> findFilmsByActor(String firstName, String lastName){
        List<Actor> actors = actorRepository.findByFirstNameIgnoreCaseAndLastNameIgnoreCase(firstName, lastName);
        List<Film> films = new ArrayList<>();
        for(Actor actor: actors){
            films.addAll(actor.getFilms());
        }
        return films;
    }

    public Actor incrementVotes(Integer actorID){
        Actor actor = actorRepository.findById(actorID).orElse(null);
        if(actor != null){
            actor.setVotes(actor.getVotes() + 1);
            return actorRepository.save(actor);
        }
        return null;
    }

    public Actor mapRowToActor(ResultSet resultSet) throws SQLException{
        Actor actor = new Actor();
        actor.setActorID(resultSet.getInt("actor_id"));
        actor.setFirstName(resultSet.getString("first_name"));
        actor.setLastName(resultSet.getString("last_name"));
        actor.setVotes(resultSet.getInt("votes"));
        return actor;
    }

    public List<Actor> getFirstFiveActors(){
        String sql = "SELECT * FROM actor ORDER BY actor_id LIMIT 5";
        return jdbcTemplate.query(sql, (rs, rowNum) -> mapRowToActor(rs));
    }

    List<Integer> getAllVotes(){
        return actorRepository.getAllVotes();
    }

}
