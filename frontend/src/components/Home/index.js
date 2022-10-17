import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Home() {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>{sessionUser ? <Redirect to='/login' /> : <Redirect to='/channels/@me' />}</>
    )

}

export default Home;