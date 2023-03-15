import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

import './Login.css';

import tomate from '../images/tomate.png';
import logo from '../images/logo.png';

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

  const verifyBtn = !(validaEmail && validaPassword);

  const handleClick = () => {
    if (!verifyBtn) {
      localStorage.setItem('user', JSON.stringify({ email: user.email }));
      history.push('/meals');
    } else {
      global.alert('Digite um email válido e uma senha com mais de 6 caracteres');
    }
  };

  return (
    <section className="login_page">
      <div className="login_top">
        <img
          src={ logo }
          alt="logo"
          className="logo_img"
        />
        <img
          src={ tomate }
          alt="tomate"
          className="tomate_img"
        />
      </div>
      <div className="login_text">
        <h1>LOGIN</h1>
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          name="email"
          onChange={ verifyEmail }
          placeholder="Email"
        />
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          name="password"
          onChange={ verifyPassword }
          placeholder="Password (min. 7 characters)"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          // disabled={ verifyBtn }
          onClick={ handleClick }
          className={
            verifyBtn
              ? 'login_btn_disabled'
              : 'login_btn'
          }
        >
          ENTER
        </button>
      </div>
    </section>
  );
}
