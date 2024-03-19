package com.tsi.gilligan.andrew;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@SpringBootApplication
@RestController
@RequestMapping("/home")
@CrossOrigin
public class SpringStarterApplication {

	@Autowired
	public ActorRepository actorRepo;

	@Autowired
	public FilmRepository filmRepo;

	@Autowired
	public ActorService actorService;

	@Autowired
	public FilmService filmService;

	@Autowired
	public FilmActorRepository filmActorRepository;

	@Autowired
	public FilmActorService filmActorService;

	public SpringStarterApplication(ActorRepository actorRepo, FilmRepository filmRepo, FilmActorRepository filmActorRepository){
		this.actorRepo = actorRepo;
		this.filmRepo = filmRepo;
		this.filmActorRepository = filmActorRepository;
	}

	@GetMapping("/allActors")
	public Iterable<Actor> getAllActors(){
		return actorRepo.findAll();
	}

	@GetMapping("/allFilms")
	public Iterable<Film> getAllFilms(){
		return filmRepo.findAll();
	}

	@GetMapping("/allFilmActors")
	public Iterable<FilmActor> getAllFilmActors(){
		return filmActorService.getAllFilmActors();
	}

	@GetMapping("/allActors/{id}")
	public Actor getActorByID(@PathVariable Integer id){
		return actorService.getActorByID(id);
	}

	@GetMapping("/allFilms/{id}")
	public Film getFilmByID(@PathVariable Integer id){
		return filmService.getFilmByID(id);
	}

	@PostMapping("/allActors")
	public Actor createActor(@RequestBody Actor actor){
		return actorService.saveOrUpdateActor(actor);
	}

	@PutMapping("/allActors/{id}")
	public Actor updateActor(@PathVariable Integer id, @RequestBody Actor actor){
		actor.setActorID(id);
		return actorService.saveOrUpdateActor(actor);
	}
	@PostMapping("/allFilms")
	public Film createFilm(@RequestBody Film film){
		return filmService.saveOrUpdateFilm(film);
	}

	@PutMapping("/allFilms/{id}")
	public Film updateFilm(@PathVariable Integer id, @RequestBody Film film){
		film.setFilmID(id);
		return filmService.saveOrUpdateFilm(film);
	}

	@DeleteMapping("/allActors/{id}")
	public void deleteActor(@PathVariable Integer id){
		actorService.deleteActor(id);
	}

	@DeleteMapping("/allFilms/{id}")
	public void deleteFilm(@PathVariable Integer id){
		filmService.deleteFilm(id);
	}

	@GetMapping("/allFilms/filter")
	public Iterable<Film> sortFilmsByYear(@RequestParam int year){
		return filmService.sortFilmsByYear(year);
	}

	@GetMapping("/allActors/sorted")
	public Iterable<Actor> sortActors(){
		return actorService.sortActors();
	}

	@GetMapping("allActors/toCSV")
	public ResponseEntity<byte[]> exportToCSV() throws IOException{
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentDispositionFormData("attachment", "actors.csv");
		return ResponseEntity
				.ok()
				.headers(headers)
				.body(actorService.exportToCSV().readAllBytes());
	}

	@GetMapping("/allActors/filmsbyID")
	public List<Film> findFilmsByID(@RequestParam Integer actorID){
		return actorService.findFilmByActorID(actorID);
	}

	@GetMapping("/allActors/filmsByActor")
	public List<Film> filmsByActor(@RequestParam String firstName, @RequestParam String lastName){
		return actorService.findFilmsByActor(firstName, lastName);
	}

	@PostMapping("/allActors/votes/{actorID}")
	public Actor voteForActor(@PathVariable Integer actorID){
		return actorService.incrementVotes(actorID);
	}

	@GetMapping("/allActors/five")
	public List<Actor> getFirstFiveActors(){
		return actorService.getFirstFiveActors();
	}

	@GetMapping("/allActors/votes")
	public List<Integer> getAllVotes(){
		return actorService.getAllVotes();
	}

	public static void main(String[] args) {
		SpringApplication.run(SpringStarterApplication.class, args);
	}
}
