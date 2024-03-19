package com.tsi.gilligan.andrew;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class FilmService {

    @Autowired
    private FilmRepository filmRepository;

    public Iterable<Film> getAllFilms(){
        return filmRepository.findAll();
    }

    public Film getFilmByID(Integer id){
        return filmRepository.findById(id).orElse(null);
    }

    public Film saveOrUpdateFilm(Film film){
        return filmRepository.save(film);
    }

    public void deleteFilm(Integer id){
        filmRepository.deleteById(id);
    }

    public Iterable<Film> sortFilmsByYear(int year){
        Iterable<Film> allFilms = getAllFilms();
        List<Film> result = StreamSupport.stream(allFilms.spliterator(), false)
                .toList();
        return result.stream()
                .filter(film -> Integer.parseInt(film.getYear()) > year)
                .collect(Collectors.toList());
    }
}
