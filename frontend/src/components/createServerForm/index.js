import React, { useState } from 'react';
import * as serverActions from '../../store/servers';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'; 
import './CreateServerForm.css'


function CreateServerForm() {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    const [serverName, setServerName] = useState('');
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(serverActions.addServertoDatabase({server_name: serverName}))
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
        <div id='createServerFormContainer'>
            {sessionUser ? '' : <Redirect to='/register' /> }
            {submitted ? <Redirect to='/servers' /> : ''}
            <div id='createServerHeader'><h2>Create your Server</h2></div>
            <form onSubmit={handleSubmit}>
                <div className='inputGroup' id='serverNameGroup'>
                <label htmlFor='serverName'>Server Name</label>
                <input type='text' value={serverName} onChange={(e) => setServerName(e.target.value)} required ></input>
                </div>
                <div className='inputGroup' id='createServerSubmit'>
                    <div></div>
                    <button>Create Server</button>
                </div>
            </form>

        </div>
    )
}

export default CreateServerForm;