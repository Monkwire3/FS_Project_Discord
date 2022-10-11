import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to='/' />

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({credential, password}))
        .catch(async (res) => {
            setErrors([res.statusText]);
        });
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>

            <div>
                <label>Username or Email: </label>
                <input type='text' value={credential} onChange={(e) => setCredential(e.target.value)} required></input>
            </div>
            <div>
                <label>Password </label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required></input>
            </div>
            <div>
                <button type='submit'>Log In</button>
            </div>
        </form>
        </div>
    )
}

export default LoginFormPage