import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Login() {
  const {
    email,
    password,
    setUser,
    validaEmail,
    setValidaEmail,
    validaPassword,
    setValidaPassword,
    user,
  } = useContext(AppContext);

  const history = useHistory();

  const verifyEmail = ({ target: { value } }) => {
    const validEmail = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(value);
    setValidaEmail(validEmail);

    setUser({
      ...user,
      email: value,
    });
  };

  const verifyPassword = ({ target: { value } }) => {
    const minLength = 6;
    const validPass = value.length > minLength;
    setValidaPassword(validPass);
    setUser({
      ...user,
      password: value,
    });
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {},
      meals: {},
    }));
    history.push('/meals');
  };

  const verifyBtn = !(validaEmail && validaPassword);

  return (
    <>
      <h1>Login</h1>
      <input
        type="email"
        data-testid="email-input"
        value={ email }
        name="email"
        onChange={ verifyEmail }
      />
      <input
        type="password"
        data-testid="password-input"
        value={ password }
        name="password"
        onChange={ verifyPassword }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ verifyBtn }
        onClick={ handleClick }
      >
        Enter
      </button>
    </>
  );
}
