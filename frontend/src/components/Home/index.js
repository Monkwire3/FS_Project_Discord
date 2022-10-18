import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Home() {
    const sessionUser = useSelector(state => state.session ? state.session.user : null);
    
    if (!sessionUser) {
        return <Redirect to='/login' />
    }

    return (
        <><h1>home</h1>
        {sessionUser ? <Redirect to='/servers/@me' /> : <Redirect to='/login' />}</>
    )

}

export default Home;