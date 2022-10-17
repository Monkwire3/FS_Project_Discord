import React from 'react';
import { useParams } from 'react-router-dom';
import './ServerShow.css'




function ServerShow() {
    const { id } = useParams();

    return (
        <div id='serverShowContainer'>
            <div id='serverTop'></div>
            <div id='serverBottom'>
                <div id='serverLeft'></div>
                <div id='serverRight'></div>
            </div>
        </div>
    )
}

export default ServerShow;