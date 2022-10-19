import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import * as serverActions from '../../store/servers'
import { useState } from 'react';
import './EditServerForm.css';



function EditServerForm() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const servers = useSelector(serverActions.getServers);

    const [serverName, setServerName] = useState('');
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(serverActions.fetchServers())
    }, [])

    useEffect(() => {
        try {
            setServerName(servers.filter((server) => `${server.id}` === id)[0].serverName)
        } catch {

        }
    }, [servers])


    function handleSubmit(e) {
        e.preventDefault();
        return dispatch(serverActions.editServer({server_name: serverName, id: id}))
        .then(setSubmitted(true))
        .catch(async (res) => {
            let data;
            debugger
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
        <form id='editServerForm' onSubmit={handleSubmit}>
            {submitted ? <Redirect to={`/servers/${id}`} /> : ''}
            <div className='inputGroup'>
                <label htmlFor='serverName'>Server Name</label>
                <input type='text' value={serverName} onChange={(e) => setServerName(e.target.value)} required></input>
            </div>
            <div className='inputGroup'>
                <button>Submit Changes</button>
            </div>
        </form>
    )
}

export default EditServerForm;