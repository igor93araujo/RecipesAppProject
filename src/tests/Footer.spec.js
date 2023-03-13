import React from 'react';
import { screen } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const drinksBtnTestID = 'drinks-bottom-btn';
const exploreBtnTestID = 'meals-bottom-btn';

describe('Testa o componente Footer.js', () => {
  it('Teste de footer esta sendo renderizado /meals', () => {
    renderWithRouter(<App />, ['/meals']);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();

    // teste se contem 2 icones
    const drinksIcon = screen.getByTestId(drinksBtnTestID);
    const mealsIcon = screen.getByTestId(exploreBtnTestID);
    expect(drinksIcon).toBeInTheDocument();
    expect(mealsIcon).toBeInTheDocument();
  });

  it('Teste de footer esta sendo renderizado /drinks', () => {
    renderWithRouter(<App />, ['/drinks']);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    // teste se contem 2 icones
    const drinksIcon = screen.getByTestId(drinksBtnTestID);
    const mealsIcon = screen.getByTestId(exploreBtnTestID);
    expect(drinksIcon).toBeInTheDocument();
    expect(mealsIcon).toBeInTheDocument();
  });

  it('Teste de footer esta sendo renderizado /profile', () => {
    renderWithRouter(<App />, ['/profile']);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    // teste se contem 2 icones
    const drinksIcon = screen.getByTestId(drinksBtnTestID);
    const mealsIcon = screen.getByTestId(exploreBtnTestID);
    expect(drinksIcon).toBeInTheDocument();
    expect(mealsIcon).toBeInTheDocument();
  });

  it('Teste não contem um footer em /done-recipes', () => {
    renderWithRouter(<App />, ['/done-recipes']);
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('Teste não contem um footer em /favorite-recipes', () => {
    renderWithRouter(<App />, ['/favorite-recipes']);
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('Teste se não comtem um footer esta sendo renderizado /', () => {
    renderWithRouter(<App />);
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('Teste se ao clicar no icone de bebidas, redireciona para /drinks', () => {
    const { history } = renderWithRouter(<App />, ['/meals']);
    const drinksIcon = screen.getByTestId(drinksBtnTestID);
    useEvent.click(drinksIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('Teste se ao clicar no icone de comidas, redireciona para /meals', () => {
    const { history } = renderWithRouter(<App />, ['/drinks']);
    const mealsIcon = screen.getByTestId(exploreBtnTestID);
    useEvent.click(mealsIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
