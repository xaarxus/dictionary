import React, { useRef } from 'react';
import '../styles/Login.sass';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Registration = () => {
    const nicknameInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const repeatPasswordInput = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(nicknameInput.current.value, passwordInput.current.value)
    }

    return (
        <div className="login flex">
            <h1>Sing Up</h1>
            <hr />
            <form className="flex" onSubmit={handleSubmit}>
                <input onClick={(e) => nicknameInput.current.value = e.target.value} ref={nicknameInput} placeholder="nickname" /><br />
                <input onClick={(e) => emailInput.current.value = e.target.value} ref={emailInput} placeholder="email" /><br />
                <input onClick={(e) => passwordInput.current.value = e.target.value} ref={passwordInput} placeholder="password" /><br />
                <input onClick={(e) => repeatPasswordInput.current.value = e.target.value} ref={repeatPasswordInput} placeholder="repeat paaword" /><br />
                <Button type="submit">Sing Un</Button>
            </form>
            <div className="change-form">If you have an account, you can <Link to="/login">Sing In</Link></div>
        </div>
    );
};

export default Registration;