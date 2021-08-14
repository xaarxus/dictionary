import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { login } from '../actions/index';

const mapStateToProps = (state) => {
    return { user: state.user };
};

const Login = ({ user, dispatch }) => {
    const [state, setState] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user.nickname) {
            setState('login');
            return;
        }
        setState('logout');
    }, []);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            const { email, password } = values;
            const res = await axios.post('http://localhost:5000/auth/login', {
                email, password
            });
            if (res.data.message) {
                setMessage(res.data.message);
                return;
            }
            setState('login');
            dispatch(login({ user: { ...res.data.user, accessToken: res.data.accessToken } }));
        }
    });

    return (<>
        {state === 'login' ? <Redirect to="/" /> :
            <div className="login flex">
                <h1>Sing in</h1>
                <hr />
                {message ? <p className='msg'>{message}</p> : null}
                <form className="flex" onSubmit={formik.handleSubmit}>
                    <input type="email" value={formik.values.email} onChange={formik.handleChange} name="email" placeholder="email" /><br />
                    <input type="password" value={formik.values.password} onChange={formik.handleChange} name="password" placeholder="password" /><br />
                    <Button variant="outline-primary" type="submit">Continue</Button>
                </form>
                <div className="text-center">If you don't have an account, you can <Link className='log-link' to="/registration">Sing Up</Link></div>
            </div>
        }
    </>);
};

export default connect(mapStateToProps)(Login);