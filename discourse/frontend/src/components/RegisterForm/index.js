import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import * as usersActions from '../../store/users'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './RegisterForm.css'

function RegisterFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] =  useState('');;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        return dispatch(usersActions.addUserToDatabase({email, username, password}))
        .then(() => {
            dispatch(sessionActions.login({credential: username, password: password}))})
        .catch(async (res) => {
            setErrors([res.statusText]);
        })
        // return dispatch(sessionActions.login({credential: username, password: password}))

    }


    return (
        <div id="registerContainer">
            {sessionUser ? <Redirect to="/" /> : ''}
            <h1>Create an account</h1>
            <form onSubmit={handleSubmit}>
                <div className='inputGroup'>
                    <label>Email</label>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                </div>

                <div className='inputGroup'>
                    <label>Username</label>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required></input>
                </div>

                <div className='inputGroup'>
                    <label>Password</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                </div>

                <div className='inputGroup'>
                    <button>Create Account</button>
                </div>
                <div>
                    <span><a href="/login">Already have an account?</a></span>
                </div>


            </form>



        </div>
    )
}

export default RegisterFormPage