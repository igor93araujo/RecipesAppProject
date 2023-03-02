import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('1 - Teste da tela de login', () => {
  it('1.1 - Teste se componentes estã osendo renderizados corretamente', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    const validEmail = 'test@test.com';
    const validPass = '1234567';

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPass);
    expect(loginButton).toBeEnabled();
  });
});
