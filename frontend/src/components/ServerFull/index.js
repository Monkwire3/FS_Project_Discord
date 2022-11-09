import React, { useEffect } from "react";
import ServerIndex from "../ServerIndex";
import LeftSidebar from "../leftSideBar";
import ServerShow from "../ServerShow";
import ServerIndexItem from "../serverIndexItem";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import MeLeftBar from "../MeLeftBar";
import { fetchChannel, getChannel } from "../../store/channels";


function ServerFull() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { id } = useParams();
    const currentChannel = useSelector(state => state.channels)[id];


    useEffect(() => {
        dispatch(fetchChannel(id));
    }, [])

    useEffect(() => {
        dispatch(fetchChannel(id))
    }, [id])

    useEffect(() => {


    }, [currentChannel])


    if (!sessionUser) {
        return <Redirect to='/login' />
    }
    return (
        <>
        <ServerIndex />
        {currentChannel ? <LeftSidebar serverId={currentChannel.serverId} /> : '' }
        <ServerShow />
        </>
    )
}

export default ServerFull;


