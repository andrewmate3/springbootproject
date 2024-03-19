package com.tsi.gilligan.andrew;


import com.tsi.gilligan.andrew.Actor;
import org.hibernate.query.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface ActorRepository extends JpaRepository<Actor,Integer> {
   List<Actor>findByFirstNameIgnoreCaseAndLastNameIgnoreCase(String firstName, String lastName);

   @Query("SELECT a.votes FROM Actor a")
   List<Integer> getAllVotes();
}
