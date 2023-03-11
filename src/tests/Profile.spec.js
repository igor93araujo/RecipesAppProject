import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Profile.js', () => {
  it('Testa se a página contém as informações de perfil', () => {
    renderWithRouter(<App />, ['/profile']);

    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.queryByTestId('search-top-btn');
    const title = screen.getByTestId('page-title');
    const email = screen.getByTestId('profile-email');
    const doneRecipes = screen.getByTestId('profile-done-btn');
    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
    const logout = screen.getByTestId('profile-logout-btn');

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(doneRecipes).toBeInTheDocument();
    expect(favoriteRecipes).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });

  it('Teste se ao clicar button de receitas feitas, redireciona para a página de receitas feitas', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);

    const doneRecipes = screen.getByTestId('profile-done-btn');
    act(() => {
      doneRecipes.click();
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  it('Teste se ao clicar button de receitas favoritas, redireciona para a página de receitas favoritas', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);

    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
    act(() => {
      favoriteRecipes.click();
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  it('Teste se ao clicar button de logout, redireciona para a página de login e limpa o localStorage', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);

    const logout = screen.getByTestId('profile-logout-btn');
    act(() => {
      logout.click();
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(localStorage.getItem('user')).toBe(null);
  });
});
