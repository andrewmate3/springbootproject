import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataComponent(){
    const [apiData, setApiData] = useState([]);
    const url = 'http://localhost:8080/home/allActors';

    useEffect(() => {
       const fetchData = async () => {
        try{
            const response = await axios.get(url);
            setApiData(response.data);
            console.log(apiData)
        } catch(error){
            console.error("error", error);
        }
       };
       fetchData();
       
       const interval = setInterval(fetchData, 1000);

       return () => clearInterval(interval);
    }, [url]);

    return(
        <div>
            <h2>API Data</h2>
            <button onClick={() => window.open('ActorsTable', '_blank')}>Open Data in New Tab</button>
            <ul>
                {apiData.map(item => {
                    <li key={item.actorID}>{item.actorID}</li>
                })}
            </ul>
        </div>
    )
}

export default DataComponent;