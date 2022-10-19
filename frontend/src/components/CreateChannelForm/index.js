import React from "react";
import { useState } from "react";
import * as channelActions from '../../store/channels'
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

function CreateChannelForm({server}) {
    const dispatch = useDispatch();



    const [channelName, setChannelName] = useState('');
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState([])


    function handleSubmit(e) {
        e.preventDefault()
        return dispatch(channelActions.addChannelToDatabase({channel_name: channelName, server_id: server.id}))
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
        <form onSu>
            {submitted ? <Redirect to={`/servers/${server.id}`} /> : ''}
            <div className="inputGroup">
                <input type='text' value={channelName} onChange={(e) => setChannelName(e.target.value)} required></input>
            </div>
            <div className="inputGroup">
                <button>Add Channel</button>
            </div>


        </form>
    )


}

export default CreateChannelForm;