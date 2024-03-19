import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VotingComponent() {
    const [actors, setActors] = useState([]);
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        const fetchActors = async () => {
            try{
                const response = await axios.get("http://localhost:8080/home/allActors/five");
                setActors(response.data);
            } catch(error){
                console.error("Fetch Error", error);
            }
        };

        const interval = setInterval(() => {
            fetchActors();
        }, 1000);

        return () => clearInterval(interval);

    }, []);



    const handleVote = async(actorID) => {
        try{
           await axios.post(`http://localhost:8080/home/allActors/votes/${actorID}`);
        } catch(error){
            console.error("Error Voting", error);
        }
    };

    

    return(
        <div>
            <h2>Vote For Your Favourite Actor!</h2>
            {
                actors.map(actor => (
                    <div key={actor.actorID}>
                        <p>{actor.firstName} {actor.lastName}</p>
                        <p>Votes: {actor.votes}</p>
                        <button onClick={() => handleVote(actor.actorID)}>Vote</button>
                        </div>
                ))
            }
        </div>
    );


}

export default VotingComponent;