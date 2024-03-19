import React, { useState } from 'react';
import axios from 'axios';
const VoteComponent = () => {
    const[actors, setActors] = useState([
        { id: 10, firstName: 'CHRISTIAN', lastName: 'GABLE', votes: 0 },
        { id: 17, firstName: 'HELEN', lastName: 'VOIGHT', votes: 0 },
        { id: 18, firstName: 'DAN', lastName: 'TORN', votes: 0 },
        { id: 22, firstName: 'ELVIS', lastName: 'MARX', votes: 0 },
        { id: 26, firstName: 'RIP', lastName: 'CRAWFORD', votes: 0 }
    ]);

    const handleVote = async(actorID) => {
        try{
            const response = await axios.post("http://localhost:8080/home//allActors/votes", actorID);
            const updatedActor = response.data;
            const updatedActors = actors.map(actor => actor.id === updatedActor.id ? updatedActor : actor);
            setActors(updatedActors);
        } catch(error){
            console.error("Error voting", error);
        }
    };

    return(
        <div>
            <h2>Vote for your favourite actor!</h2>
            <ul>
                {actors.map(actor => {
                    <li key={actor.id}>Name: {actor.firstName} {actor.lastName} - Votes: {actor.votes}
                    <button onClick={() => handleVote(actor.id)}>Vote</button>
                    </li>
                })}
            </ul>
        </div>
    );
}

export default VoteComponent;