import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function RegisterFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);



    return (
        <div id="registerContainer">
            {sessionUser ? <Redirect to="/" /> : ''}
            <h1>Create an account</h1>
            <form onSubmit={handleSubmit}>

            </form>



        </div>
    )
}