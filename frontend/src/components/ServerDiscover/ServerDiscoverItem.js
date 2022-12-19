import { useDispatch } from "react-redux"
import { joinServer } from "../../store/servers";


function ServerDiscoverItem({server}) {
    const dispatch = useDispatch();

    const handleJoin = () => {
        dispatch(joinServer({serverId: server.id}))

    }
    return (
        <div className="server-discover-item">
            <div><div className="title">{server.serverName}</div><div>{`${server.members.length} members`}</div></div>
            <div><button onClick={handleJoin}>Join</button></div>

        </div>

    )
}
export default ServerDiscoverItem