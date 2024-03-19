import React, { useState } from 'react';
import axios from 'axios';

function UpdateActor() {
    const [actorId, setActorId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = async () => {
        try{
            const response = await axios.put(`http://localhost:8080/home/allActors/${actorId}`, {
                firstName: firstName,
                lastName: lastName
            });
            setMessage(`Actor with ID: ${actorId} updated successfully`);
        } catch(error){
            console.error("Error", error);
            setMessage(`Error updating actor with ID: ${actorId}, please try again`);
        }
    };

    return(
        <div>
            <h2>Update Actor</h2>
            <fieldset>
                <form>
                    <label htmlFor='actorID'>Actor ID: </label>
                    <input
                    type='number'
                    id='actorID'
                    value={actorId}
                    onChange={(e) => setActorId(e.target.value)}
                    placeholder='Actor ID'
                    />
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
                    placeholder='Last Name:'
                    />
                </form>
            </fieldset>
            <button onClick={handleUpdate}>Update Actor</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default UpdateActor;