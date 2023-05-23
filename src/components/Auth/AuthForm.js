import { useState, useContext } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [sendingRequest, setSendingRequest] = useState(false);

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSendingRequest(true);
    if(sendingRequest) {
      console.log('sending request');
    }

    const enteredEmail = emailInput;
    const enteredPassword = passwordInput;

    if (isLogin) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDPloRl2BOnT7Bl4EIlvaBNjsfaKbtdRhI', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: passwordInput,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if(res.ok) {
          setSendingRequest(false);
          setEmailInput('');
          setPasswordInput('');  
          console.log('logged in successfully!');
          return res.json();
        } else {
          return res.json().then(data => {
            let errorMsg = data.error.message;
            alert(errorMsg);
          })
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
      })
    } else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPloRl2BOnT7Bl4EIlvaBNjsfaKbtdRhI', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if(res.ok) {
          console.log('Account created successfully!');
        } else {
          res.json().then(data => {
            let errorMsg = data.error.message;
            alert(errorMsg);
          });
        }
        setSendingRequest(false);
        setEmailInput('');
        setPasswordInput('');
      });
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          {!sendingRequest && <button> {isLogin ? 'Login' : 'Create Account'} </button>}
          {sendingRequest && <p>Creating Account...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
