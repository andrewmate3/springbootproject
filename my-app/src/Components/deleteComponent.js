import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'

function DeleteActor(){

    const [actorID, setActorID] = useState('');
    const [message, setMessageID] = useState('');

    const handleDelete = async () => {
        try{
            await axios.delete(`http://localhost:8080/home/allActors/${actorID}`);
            setMessageID(`Actor with id ${actorID} deleted`);
            setActorID('');
        } catch(error){
            console.error("Error", error);
            setMessageID(`Error deleting actor with ID ${actorID}, please try again`);
        }
    };

    return(
        <div>
            <h2>DELETE AN ACTOR</h2>
            <div>
                <fieldset>
                    <form>
                <label htmlFor='actorID'>Actor ID: </label>
                <input 
                type='number'
                id='actorID'
                value={actorID}
                onChange={(e) => setActorID(e.target.value)}
                placeholder='Actor ID'
                />
                </form>
                </fieldset>
            </div>
            <button onClick={handleDelete}>Delete Actor</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default DeleteActor;