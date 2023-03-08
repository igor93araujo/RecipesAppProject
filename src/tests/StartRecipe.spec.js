import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente StartRecipe.js', () => {
  it('Testa se o botão de iniciar receita está presente em meals e se clicar nele redireciona para a pagina de receita em progresso', async () => {
    const { history } = renderWithRouter(<App />, ['/meals']);

    const { pathname } = history.location;

    waitFor(() => {
      const firstELement = screen.getByTestId('0-recipe-card');
      userEvent.click(firstELement);

      expect(pathname).toBe('/meals/52977');

      const startRecipe = screen.getByTestId('start-recipe-btn');
      expect(startRecipe).toBeInTheDocument();
      userEvent.click(startRecipe);

      expect(pathname).toBe('/meals/52977/in-progress');
    });
  });

  it('Testa se o botão de iniciar receita está presente em drinks e se clicar nele redireciona para a pagina de receita em progresso', async () => {
    const { history } = renderWithRouter(<App />, ['/drinks']);

    const { pathname } = history.location;

    waitFor(() => {
      const firstELement = screen.getByTestId('0-recipe-card');
      userEvent.click(firstELement);

      expect(pathname).toBe('/drinks/178319');

      const startRecipe = screen.getByTestId('start-recipe-btn');
      expect(startRecipe).toBeInTheDocument();
      userEvent.click(startRecipe);

      expect(pathname).toBe('/drinks/178319/in-progress');
    });
  });
});
