import React from "react";
import ServerIndex from "../ServerIndex";
import LeftSidebar from "../leftSideBar";
import ServerShow from "../ServerShow";
import ServerIndexItem from "../serverIndexItem";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


function ServerFull() {
    const sessionUser = useSelector(state => state.session.user);


    if (!sessionUser) {
        return <Redirect to='/login' />
    }
    return (
        <>
        <ServerIndex />
        <LeftSidebar />
        <ServerShow />
        </>
    )
}

export default ServerFull;


