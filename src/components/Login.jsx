import React, { useRef } from 'react';
import '../styles/Login.sass';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
    const nicknameInput = useRef(null);
    const passwordInput = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(nicknameInput.current.value, passwordInput.current.value)
    }

    return (
        <div className="login flex">
            <h1>Sing In</h1>
            <hr />
            <form className="flex" onSubmit={handleSubmit}>
                <input onClick={(e) => nicknameInput.current.value = e.target.value} ref={nicknameInput} placeholder="nickname" /><br />
                <input onClick={(e) => passwordInput.current.value = e.target.value} ref={passwordInput} placeholder="password" /><br />
                <Button type="submit">Sing In</Button>
            </form>
            <div className="change-form">If you don't have an account, you can <Link to="/registration">Sing Up</Link></div>
        </div>
    );
};

export default Login;