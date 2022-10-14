import React from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './Navbar.css'
import { Link } from "react-router-dom";


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
            <div id='nav-links'>
                <Link to='/servers'>Server List</Link>
                <Link to='/servers/new'>Create Server</Link>
            </div>
            <div id='nav-login'>
            <div>{navText}</div>
            {sessionUser ? <button onClick={handleClick}>Log out</button> : <button><a href="/login">Log In</a></button>}
            </div>
        </nav>
    )
}

export default Navbar