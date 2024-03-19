import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'

function ActorsTable(){
    const [actors, setActors] = useState([]);
    const url = 'http://localhost:8080/home/allActors?limit=15';
    const [sortedActors, setSortedActors] = useState([]);
    const [sortMode, setSortMode] = useState(false);


    useEffect(() => {
        const interval = setInterval(() => {
            fetchActors();
            if(sortMode){
                fetchSortedActors();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [sortMode]);

    const fetchActors = async () => {
        try{
            const response = await axios.get('http://localhost:8080/home/allActors?limit=15');
            setActors(response.data);
        } catch(error){
            console.error("error", error);
        }
    };

    const fetchSortedActors = async () => {
        try{
            const response = await axios.get('http://localhost:8080/home/allActors/sorted');
            setSortedActors(response.data);
    
        } catch(error){
            console.error("Error in sort", error);
        }
    };

    const handleSort = () => {
        setSortMode(true);
    }

    const handleRefresh = () => {
        setSortMode(false);
    }

    return(
        <>
        <div className='wrapper'>
        <div className='header'>
        <h2>ACTORS TABLE</h2>
        <button onClick={handleSort}>Sort</button>
        <button onClick={handleRefresh}>Refresh</button>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {sortMode ? (
                        sortedActors.map(actor => (
                            <tr key={actor.actorID}>
                                <td>{actor.actorID}</td>
                                <td>{actor.firstName}</td>
                                <td>{actor.lastName}</td>
                            </tr>
                        ))
                    ) : (
                        actors.map(actor => (
                            <tr key={actor.actorID}>
                                <td>{actor.actorID}</td>
                                <td>{actor.firstName}</td>
                                <td>{actor.lastName}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        </div>
        </>
    );
}

export default ActorsTable;