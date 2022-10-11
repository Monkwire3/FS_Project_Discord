import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'


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


    const loginDemoUser = () => {
        return dispatch(sessionActions.login({credential: 'usr', password: 'starwars'}))
        .catch(async (res) => {
            setErrors([res.statusText])
        })
    }

    return (
        <div id="loginContainer">
        <div id='loginBox'>
        <div id='welcomeText'>
            <h2>Welcome back!</h2>
            <h3>We're so excited to see you again!</h3>
        </div>
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <div className='inputGroup'>
                <label>Username or Email </label>
                <input type='text' value={credential} onChange={(e) => setCredential(e.target.value)} required></input>
            </div>
            <div className='inputGroup'>
                <label>Password </label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required></input>
            </div>
            <div className='inputGroup'>
                <button type='submit'>Log In</button>
            </div>
        </form>
        <div id='registrationDiv'>
            <span>Need an account? <a href='/register'>Register</a></span>

        </div>
        <button onClick={loginDemoUser}>Log in as demo user</button>
        </div> 

        <div className='spacer'>
        </div>
 
        <div id='barcodeDiv'>
            <div id='barcode'></div>
            <div id='qrText'>
                <h2>Log in with QR Code</h2>
                <h3>Scan this with the <b>Discord mobile app</b> to log in instantly.</h3>

            </div>

        </div>
        </div>
    )
}

export default LoginFormPage