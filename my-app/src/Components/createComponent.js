import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'
import Navbar from './navComponent';

function CreateForm(){
    const[formData, setFormData] = useState({actorID: "", firstName: "", lastName: ""});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:8080/home/allActors', formData, {
                headers: {"Content-Type": "application/json"}
            });

        } catch(error){
            console.error("biiiig error", error);
        }
    };

    return(
        <div>
            <h2 className='chead'>ADD A NEW ACTOR</h2>
            <fieldset className='cfield'>
        <form onSubmit={handleSubmit} className='cform'>
            <input type='text' name='actorID' placeholder='Actor ID' value={formData.actorID} onChange={handleChange}/>
            <input type='text' name='firstName' placeholder='First Name' value={formData.firstName} onChange={handleChange}/>
            <input type='text' name='lastName' placeholder='Last Name' value={formData.lastName} onChange={handleChange}></input>
            <button type='submit' className='cbutton'>Add Actor</button>
        </form>
            </fieldset>
        </div>
    );
}

export default CreateForm;