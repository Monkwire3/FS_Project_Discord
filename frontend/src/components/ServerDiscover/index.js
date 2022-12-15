import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUndiscovered } from "../../store/servers";
import './ServerDiscover.css';


function ServerDiscover() {
    const dispatch = useDispatch();
    const unjoinedServers = useSelector(state => state.servers.undiscovered);

    useEffect(() => {
        dispatch(fetchUndiscovered());
    }, [])

    // const unjoined = unjoinedServers.map((server) => <ServerDiscoverItem server={server} />)

    return (
        <div id='server-discover'>
            <h1>Join a New Server!</h1>
        </div>
    )

}

export default ServerDiscover;