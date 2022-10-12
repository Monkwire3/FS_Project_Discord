import React from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './Navbar.css'


function Navbar() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    let navText;

    if (sessionUser) {
        navText = `Hi, ${sessionUser.username}`
    } else {
        navText = "You are not logged in"
    }


    function handleClick() {
        return dispatch(sessionActions.logout())
    }

    return (
        <nav>
            <div>{navText}</div>
            {sessionUser ? <button onClick={handleClick}>Log out</button> : <button><a href="/login">Log In</a></button>}
        </nav>
    )
}

export default Navbar