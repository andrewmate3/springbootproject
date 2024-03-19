package com.tsi.gilligan.andrew;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.tsi.gilligan.andrew.Film;

@Repository
public interface FilmRepository extends JpaRepository<Film,Integer>{
}
