import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Login() {
  const { email, password } = useContext(AppContext);

  return (
    <>
      <h1>Login</h1>
      <input
        type="email"
        data-testid="email-input"
        value={ email }
        onChange={ ({ target }) => setUser({ ...user, email: target.value }) }
      />
      <input
        type="password"
        data-testid="password-input"
        value={ password }
        onChange={ ({ target }) => setUser({ ...user, password: target.value }) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ () => console.log('login') }
      >
        Enter
      </button>
    </>
  );
}

export default Login;
