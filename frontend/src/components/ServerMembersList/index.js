import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannel, getChannel } from "../../store/channels";
import { fetchServer, getServer } from "../../store/servers";
import ServerMemberListItem from "../ServerMemberListItem";
import './ServerMembersList.css';


function ServerMembersList({serverId}) {
    const dispatch = useDispatch();
    const server = useSelector(getServer(serverId));

    useEffect(() => {
        dispatch(fetchServer(serverId));
    }, [])


    const serverMembers = server ? server.members.map((member) => <ServerMemberListItem key={`member_id${member.id}`} member ={member} />) : ''

    return (
        <div id='server-members-list-container'>
        {serverMembers}
        </div>

    )
}

export default ServerMembersList;