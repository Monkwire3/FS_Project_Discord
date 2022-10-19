import React from "react";
import { useState } from "react";
import * as channelActions from '../../store/channels'

function CreateChannelForm({server}) {


    const [channelName, setChannelName] = useState();


    function handleSubmit() {
        console.log('submit')
    }

    return (
        <form>
            <div className="inputGroup">
                <input type='text' value={channelName} onChange={setChannelName((e) => setChannelName(e.target.value))} required></input>
            </div>
            <div className="inputGroup">
                <button>Add Channel</button>
            </div>


        </form>
    )


}