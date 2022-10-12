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
    const [errors, setErrors] = useState('');
    const [parsedErrors,  setParsedErrors] = useState({email: '', username: '', password: ''});


    const parseEmail = () => {
        if ( errors.length && errors.message.includes('Email')) {
            if (!/\S+@\S+\.\S+/.test(email)) {
                return  '- Must be a well-formed email address';
            } else if (email.lengh === 0) {
                return  'Email must not be blank'
            } else if (errors.message.includes('taken')) {
                return "- Email has already been taken"
            }
            return ""
        }
    }

    const parseUsername = () => {
        if (username.length < 3) {
            return 'Username must be at least 3 character'
        }
        return ""
    }

    const parsePassword = () => {
        if (password.length < 8) {
            return 'Password must be at least 8 characters';
        }
        return ""
    }

    

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        return dispatch(usersActions.addUserToDatabase({email, username, password}))
        .then(() => {
            dispatch(sessionActions.login({credential: username, password: password}))})
        .catch(async (res) => {
            let data;
            try {
                data = await res.clone.json();
            } catch {
                data = await res.text()
            }
            if (data?.errors) {
                setErrors(JSON.parse(data.errors));
            } else if (data) {
                setErrors(JSON.parse(data));
            } else {
                setErrors([res.statusText]);
            }
        })
    }

    return (
        <div id="registerContainer">
            {sessionUser ? <Redirect to="/" /> : ''}
            <ul>
                {errors.message}
                {parsedErrors.asld}
            </ul>
            <h1>Create an account</h1>
            <form onSubmit={handleSubmit}>
                <div className='inputGroup'>
                    <label >Email <span className='errorMessage'>{}</span></label>
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