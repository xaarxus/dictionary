import React, { useState } from 'react';
import '../styles/Login.sass';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

const Registration = () => {
    const [state, setState] = useState('wait');


    const formik = useFormik({
        initialValues: {
            nickname: '',
            email: '',
            password: '',
            repeatPass: ''
        },
        onSubmit: async (values) => {
            setState('response');
            const { nickname, email, password, repeatPass } = values;
            const res = await axios.post('http://localhost:5000/auth/registration', {
                nickname, email, password, repeatPass
            });
            if (res.data.isCreate) {
                setState('created');
            }
        }
    });

    return (
        <div className="login flex">
            {state === 'created' ? <p>Please confirm your account registration by clicking on the link in the letter that we sent you by mail.</p> :
                <>
                    <h1>Sing up</h1>
                    <hr />
                    {state !== 'wait' ?
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div> :
                        <form className="flex" onSubmit={formik.handleSubmit}>
                            <input type="text" value={formik.values.nickname} onChange={formik.handleChange} name="nickname" placeholder="nickname" /><br />
                            <input type="email" value={formik.values.email} onChange={formik.handleChange} name="email" placeholder="email" /><br />
                            <input type="password" value={formik.values.password} onChange={formik.handleChange} name="password" placeholder="password" /><br />
                            <input type="password" value={formik.values.repeatPass} onChange={formik.handleChange} name="repeatPass" placeholder="confirm password" /><br />
                            <Button type="submit">Continue</Button>
                        </form>
                    }
                    <div className="text-center">If you have an account, you can <Link className='log-link' to="/login">Sing In</Link></div>
                </>
            }
        </div>
    );
};

export default Registration;