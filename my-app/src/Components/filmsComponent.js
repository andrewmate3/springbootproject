import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'

function FindFilms(){

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [films, setFilms] = useState([]);

    const handleSearch = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/home/allActors/filmsByActor?firstName=${firstName}&lastName=${lastName}`);
            const filmsData = response.data;
            console.log("Films:", filmsData);
            setFilms(filmsData);
        } catch(error){
            console.error("error", error);
        }
    };

    return(
        <div>
            <h2>FIND FILMS BY ACTOR</h2>
            <div>
                <fieldset>
                    <form>
                <label htmlFor='firstName'>First Name: </label>
                <input 
                type='text'
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='First Name'
                />
                <label htmlFor='lastName'>Last Name: </label>
                    <input
                    type='text'
                    id='lastName'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder='Last Name'
                    />
            </form>
                </fieldset>
                </div>
            <button onClick={handleSearch}>Search Films</button>
            <div>
                {films.length > 0 && (
                    <div>
                        <h3>Films: </h3>
                        <ol>
                            {films.map(film => (
                                <li key={film.filmID}>{film.title}</li>
                            ))}
                        </ol>
                    </div>
                )}
            </div>
        </div>
    );

}

export default FindFilms;