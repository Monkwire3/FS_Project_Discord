import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import * as serverActions from '../../store/servers'
import { useState } from 'react';
import './EditServerForm.css';



function EditServerForm({server}) {
    const dispatch = useDispatch();

    const [serverName, setServerName] = useState(server.serverName);
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState([]);


    
    function handleSubmit(e) {
        e.preventDefault();
        return dispatch(serverActions.editServer({server_name: serverName, id: server.id}))
        .then(setSubmitted(true))
        .catch(async (res) => {
            let data;
            try {
                data = await res.clone.json();
            } catch {
                data = await res.text()
            }

            if (data?.errors) {
                setErrors([JSON.parse(data.errors)]);
            } else if (data) {
                setErrors([JSON.parse(data)]);
            } else {
                setErrors([res.statusText]);
            }
        })
    }

    
    return (
        <div id='editServerFormContainer'>
        <form id='editServerForm' onSubmit={handleSubmit}>
            {/* {submitted ? <Redirect to={`/servers/${server.id}`} /> : ''} */}
            <div className='inputGroup'>
                <label htmlFor='serverName'>Server Name</label>
                <input type='text' value={serverName} onChange={(e) => setServerName(e.target.value)} required></input>
            </div>
            <div className='inputGroup'>
                <button>Submit Changes</button>
            </div>
        </form>
        </div>
    )
}

export default EditServerForm;