import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServers, getServers } from "../../store/servers";
import './JoinServerForm.css';



function JoinServerForm() {
    const dispatch = useDispatch();
    const servers = useSelector(getServers);

    useEffect(() => {
        dispatch(fetchServers());
    });

    const serverListItems = servers.map((server) => <div className="join-server-item">{server.serverName}</div>)
    
    return (
        <div id='join-server-form-container'>
            {serverListItems}
        </div>
    )
}

export default JoinServerForm;