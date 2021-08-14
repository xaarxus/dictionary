import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

const Registration = () => {
    const [state, setState] = useState('wait');
    const [message, setMessage] = useState('');


    const formik = useFormik({
        initialValues: {
            nickname: '',
            email: '',
            password: '',
            repeatPass: ''
        },
        onSubmit: async (values) => {
            const { nickname, email, password, repeatPass } = values;
            if (password !== repeatPass) {
                setMessage('Passwords must match');
                return;
            }

            setState('response');
            const res = await axios.post('http://localhost:5000/auth/registration', {
                nickname, email, password, repeatPass
            });
            if (res.data.isCreate) {
                setMessage('');
                setState('created');
                return;
            }
            setState('wait');
            setMessage(res.data.message);
        }
    });

    return (
        <div className="login flex">
            {state === 'created' ? <p>Please confirm your account registration by clicking on the link in the letter that we sent you by mail.</p> :
                <>
                    <h1>Sing up</h1>
                    <hr />
                    {message ? <p className='msg'>{message}</p> : null}
                    {state !== 'wait' ?
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div> :
                        <form className="flex" onSubmit={formik.handleSubmit}>
                            <input type="text" value={formik.values.nickname} onChange={formik.handleChange} name="nickname" placeholder="nickname" required pattern='\w{3,30}' title='3 to 30 letters' /><br />
                            <input type="email" value={formik.values.email} onChange={formik.handleChange} name="email" placeholder="email" required title='email' /><br />
                            <input type="password" value={formik.values.password} onChange={formik.handleChange} name="password" placeholder="password" required pattern='\w{5,30}' title='5 to 30 letters' /><br />
                            <input type="password" value={formik.values.repeatPass} onChange={formik.handleChange} name="repeatPass" placeholder="confirm password" required pattern='\w{5,30}' title='5 to 30 letters' /><br />
                            <Button variant="outline-primary" type="submit">Continue</Button>
                        </form>
                    }
                    <div className="text-center">If you have an account, you can <Link className='log-link' to="/login">Sing In</Link></div>
                </>
            }
        </div>
    );
};

export default Registration;