import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const mainTestId = 'email-input';
const passwordTestId = 'password-input';
const loginButtonTestId = 'login-submit-btn';

describe('1 - Teste da tela de login', () => {
  it('1.1 - Teste se componentes estão sendo renderizados corretamente', () => {
    const mockLogin = jest.fn();

    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(mainTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginButton = screen.getByTestId(loginButtonTestId);

    const validEmail = 'test@test.com';
    const validPass = '1234567';

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPass);
    expect(loginButton).toBeEnabled();

    waitFor(() => {
      userEvent.click(loginButton);
      expect(mockLogin).toBeCalledTimes(1);
    });
  });

  it('1.2 - Teste se o botão de login está desabilitado quando o email ou a senha não são válidos', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(mainTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginButton = screen.getByTestId(loginButtonTestId);

    const invalidEmail = 'test';
    const invalidPass = '123';

    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, invalidEmail);
    userEvent.type(passwordInput, invalidPass);
    expect(loginButton).toBeDisabled();
  });

  it('1.3 - Teste se ao clicar no botão de Enter é redirecionado para a página de comidas', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(mainTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginButton = screen.getByTestId(loginButtonTestId);

    const validEmail = 'teste@teste.com';
    const validPass = '1234567';

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPass);
    waitFor(() => {
      userEvent.click(loginButton);
      const pageTitle = screen.getByTestId('page-title');
      expect(pageTitle).toBeInTheDocument();
      expect(pageTitle).toHaveTextContent('Meals');
    });
  });
});
