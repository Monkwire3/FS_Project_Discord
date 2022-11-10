import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannel, getChannel } from "../../store/channels";
import { fetchServer, getServer } from "../../store/servers";


function ServerMembersList({serverId}) {
    const dispatch = useDispatch();
    const server = useSelector(getServer(serverId));

    useEffect(() => {
        dispatch(fetchServer(serverId));
    }, [])


    const serverMembers = server ? server.members.map((member) => <li>{member.username}</li>) : ''

    return (
        <>
        <h3>Members: </h3>
        <ul>{serverMembers}</ul>
        </>

    )
}

export default ServerMembersList;