package com.tsi.gilligan.andrew;
import jakarta.persistence.*;

@Entity
@Table(name="film_actor")
public class FilmActor {
    @Id
    @Column(name = "actor_id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int actorID;

    @Column(name = "film_id", unique = true)
    private int filmID;

    public int getActorID2(){
        return actorID;
    }

    public int getFilmID2(){
        return filmID;
    }

    public void setActorID2(int actorID){
        this.actorID = actorID;
    }

    public void setFilmID2(int filmID){
        this.filmID = filmID;
    }
}
