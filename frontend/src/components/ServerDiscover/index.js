import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUndiscovered } from "../../store/servers";
import ServerDiscoverItem from "./ServerDiscoverItem";
import './ServerDiscover.css';


function ServerDiscover() {
    const dispatch = useDispatch();
    const unjoinedServers = useSelector(state => state.servers.undiscovered);

    useEffect(() => {
        dispatch(fetchUndiscovered());
    }, [])

    const unjoined = unjoinedServers ? unjoinedServers.map((server) => <ServerDiscoverItem  key={`serverDiscoverItem_${server.id}`} server={server} />) : ''

    return (
        <div id='server-discover'>
            <h1>Join a New Server!</h1>
            {unjoined}
        </div>
    )

}

export default ServerDiscover;