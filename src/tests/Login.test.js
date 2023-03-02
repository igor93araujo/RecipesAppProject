import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('1 - Teste da tela de login', () => {
  it('1.1 - Teste se componentes estã osendo renderizados corretamente', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
