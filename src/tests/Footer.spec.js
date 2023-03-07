import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Footer.js', () => {
  it('Testa se o footer contém os 2 elementos', () => {
    renderWithRouter(<App />, ['/meals']);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    expect(footer.children.length).toBe(2);
  });

  it('Testa se ao clicar no elemento "Drinks" o usuário é redirecionado para a página de bebidas', () => {
    const { history } = renderWithRouter(<App />, ['/meals']);
    const drinks = screen.getByTestId('drinks-bottom-btn');
    drinks.click();
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('Testa se ao clicar no elemento "Comidas" o usuário é redirecionado para a página de comidas', () => {
    const { history } = renderWithRouter(<App />, ['/drinks']);
    const meals = screen.getByTestId('meals-bottom-btn');
    meals.click();
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
