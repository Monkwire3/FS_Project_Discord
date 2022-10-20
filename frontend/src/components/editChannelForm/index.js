import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import * as channelActions from '../../store/channels'
import { useState } from 'react';
import './EditChannelForm.css';


function EditChannelForm({channel}) {
    const dispatch = useDispatch();
    const [channelName, setChannelName] = useState(channel.name);
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        debugger
        return dispatch(channelActions.editChannel({channel_name: channelName, id: channel.id}))
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

    function handleDeleteChannel(e) {
        // dispatch(channelActions.delte)

    }

    return (
        <div id='editChannelFormContainer'>
     <div id='leftChannelForm'>
            <button>DeleteChannel</button>
        </div>
        <div id='rightChannelForm'>
        <form id='editChannelForm' onSubmit={handleSubmit}>
            <div className='inputGroup'>
                <label htmlFor='channelName'></label>
                <input id="channelName" value={channelName} onChange={(e) => setChannelName(e.target.value)}></input>
            </div>
            <div className='inputGroup'>
                <button>Save Changes</button>
            </div>
        </form>
        </div>
        </div>

    )


}


export default EditChannelForm;