package com.tsi.gilligan.andrew;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FilmActorService {

    @Autowired
    private FilmActorRepository filmActorRepository;

    public Iterable<FilmActor> getAllFilmActors(){
        return filmActorRepository.findAll();
    }

}
