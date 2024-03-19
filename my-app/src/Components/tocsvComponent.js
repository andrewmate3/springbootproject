import React from "react";
import axios from 'axios'
import '../App.css'


function ExportToCsvButton(){
    const handleDownload = async () => {
        try{
            const response = await axios.get('http://localhost:8080/home/allActors/toCSV', {responseType: 'blob'});
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'actors.csv');
            document.body.appendChild(link);
            link.click();   
        } catch(error){
            console.error('Error downloading csv', error);
        }
    };

    return(
        <div>
            <h2>DOWNLOAD DATA AS CSV</h2>
            <button onClick={handleDownload} className="csvbutton">Download CSV</button>

        </div>
        
    );
}

export default ExportToCsvButton;