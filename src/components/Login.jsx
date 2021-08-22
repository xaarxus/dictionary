import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { login } from '../actions/index';
import { loginAxios } from '../services/user_service';

const mapStateToProps = (state) => ({ user: state.user });

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
      password: '',
    },
    onSubmit: async (values) => {
      const { email, password } = values;
      const res = await loginAxios(email, password);
      if (res.data.message) {
        setMessage(res.data.message);
        return;
      }
      setState('login');
      dispatch(login({ user: { ...res.data.user, accessToken: res.data.accessToken } }));
    },
  });

  return (
    <>
      {state === 'login' ? <Redirect to="/" /> : (
        <div className="login flex">
          <h1>Sing in</h1>
          <hr />
          {message ? <p className="msg">{message}</p> : null}
          <Form className="flex" onSubmit={formik.handleSubmit}>
            <Form.Control type="email" value={formik.values.email} onChange={formik.handleChange} name="email" placeholder="Email" required />
            <br />
            <Form.Control type="password" value={formik.values.password} onChange={formik.handleChange} name="password" placeholder="Password" required />
            <br />
            <Button variant="outline-primary" type="submit">Continue</Button>
          </Form>
          <div className="text-center">
            If you don&apos;t have an account, you can
            <Link className="log-link" to="/registration">Sing Up</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default connect(mapStateToProps)(Login);
