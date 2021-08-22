import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { registrationAxios } from '../services/user_service';

const submit = async (e, values, setState, setMessage) => {
  e.preventDefault();
  const {
    nickname,
    email,
    password,
    repeatPass,
  } = values;
  if (password !== repeatPass) {
    setMessage('Passwords must match');
    return;
  }
  setState('response');
  try {
    const res = await registrationAxios(nickname, email, password, repeatPass);
    if (res.data.isCreate) {
      setMessage('');
      setState('created');
      return;
    }
    setState('wait');
    setMessage(res.data.message);
  } catch (err) {
    setState('wait');
    setMessage('Unexpected error');
  }
};

const RegForm = ({ setState, setMessage }) => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');

  return (
    <Form className="flex" onSubmit={async (e) => submit(e, { nickname, email, password, repeatPass }, setState, setMessage)}>
      <Form.Control type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Nickname" required pattern="\w{3,30}" title="3 to 30 letters" />
      <br />
      <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required title="email" />
      <br />
      <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required pattern="\w{5,30}" title="5 to 30 letters" />
      <br />
      <Form.Control type="password" value={repeatPass} onChange={(e) => setRepeatPass(e.target.value)} placeholder="The password again" required pattern="\w{5,30}" title="5 to 30 letters" />
      <br />
      <Button variant="outline-primary" type="submit">Continue</Button>
    </Form>
  );
};

const Registration = () => {
  const [state, setState] = useState('wait');
  const [message, setMessage] = useState('');
  return (
    <div className="login flex">
      {state === 'created' ? <p>Please confirm your account registration by clicking on the link in the letter that we sent you by mail. The email may have ended up in the SPAM section.</p> : (
        <>
          <h1>Sing up</h1>
          <hr />
          {message ? <p className="msg">{message}</p> : null}
          {state !== 'wait' ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status"><span className="sr-only" /></div>
              {' '}
            </div>
          ) : (
            <RegForm setState={setState} setMessage={setMessage} />
          )}
          <div className="text-center">
            If you have an account, you can
            <Link className="log-link" to="/login"> Sing In</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Registration;
