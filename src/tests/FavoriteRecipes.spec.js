import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const rote = '/favorite-recipes';

describe('Testa a pagina Favorito', () => {
  // mock localStorage favoriteRecipes initial values
  const favoriteRecipes = [
    { id: '52977',
      type: 'meal',
      nationality: 'Turkish',
      category: 'Side',
      alcoholicOrNot: '',
      name: 'Corba',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg' },
    {
      id: '15997',
      type: 'drink',
      nationality: '',
      category: 'Ordinary Drink',
      alcoholicOrNot: 'Optional alcohol',
      name: 'GG',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
  ];

  // mock copy lib
  const copy = jest.fn();
  global.navigator.clipboard = { writeText: copy };

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Testa se a pagina contem as informacoes de favorito', () => {
    renderWithRouter(<App />, [rote]);

    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.queryByTestId('search-top-btn');
    const title = screen.getByTestId('page-title');
    const favoriteRecipesAll = screen.getAllByTestId(/-horizontal-image/);
    const textAllTop = screen.getAllByTestId(/-horizontal-top-text/);
    const textAllName = screen.getAllByTestId(/-horizontal-name/);
    const doneDateAll = screen.getAllByTestId(/-horizontal-done-date/);
    const shareAll = screen.getAllByTestId(/-horizontal-share-btn/);
    const favoriteAll = screen.getAllByTestId(/-horizontal-favorite-btn/);
    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterFood = screen.getByTestId('filter-by-meal-btn');
    const filterDrink = screen.getByTestId('filter-by-drink-btn');

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(filterAll).toBeInTheDocument();
    expect(filterFood).toBeInTheDocument();
    expect(filterDrink).toBeInTheDocument();
    expect(favoriteRecipesAll.length).toBe(2);
    expect(textAllTop.length).toBe(4);
    expect(textAllName.length).toBe(2);
    expect(doneDateAll.length).toBe(2);
    expect(shareAll.length).toBe(2);
    expect(favoriteAll.length).toBe(2);
  });

  it('Testa se ao clicar no botao de perfil, redireciona para a pagina de perfil', () => {
    const { history } = renderWithRouter(<App />, [rote]);

    const profileIcon = screen.getByTestId('profile-top-btn');
    act(() => {
      profileIcon.click();
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it('Testa se ao clicar no botao de compartilhar, mostra texto \'Link copied!\'', () => {
    renderWithRouter(<App />, [rote]);

    const shareAll = screen.getAllByTestId(/-horizontal-share-btn/);
    act(() => {
      shareAll[0].click();
    });

    const text = screen.getByText('Link copied!');
    expect(text).toBeInTheDocument();
  });

  it('Testa se ao clicar no botao de favorito, remove a receita da lista', () => {
    renderWithRouter(<App />, [rote]);

    const favoriteAll = screen.getAllByTestId(/-horizontal-favorite-btn/);
    act(() => {
      favoriteAll[0].click();
    });

    const favoriteRecipesAll = screen.getAllByTestId(/-horizontal-image/);
    expect(favoriteRecipesAll.length).toBe(1);
  });

  it('Testa se ao clicar no botao de filtro, filtra as receitas', () => {
    renderWithRouter(<App />, [rote]);

    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterFood = screen.getByTestId('filter-by-meal-btn');
    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    const favoriteRecipesAll = screen.getAllByTestId(/-horizontal-image/);
    expect(favoriteRecipesAll.length).toBe(2);

    act(() => {
      filterFood.click();
    });

    const favoriteRecipesAllFood = screen.getAllByTestId(/-horizontal-image/);
    expect(favoriteRecipesAllFood.length).toBe(1);

    act(() => {
      filterDrink.click();
    });

    const favoriteRecipesAllDrink = screen.getAllByTestId(/-horizontal-image/);
    expect(favoriteRecipesAllDrink.length).toBe(1);

    act(() => {
      filterAll.click();
    });

    const favoriteRecipesAllAll = screen.getAllByTestId(/-horizontal-image/);
    expect(favoriteRecipesAllAll.length).toBe(2);
  });

  it('Testa se ao clicar na receita, redireciona para a pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />, [rote]);

    const favoriteRecipesAll = screen.getAllByTestId(/-horizontal-image/);
    act(() => {
      favoriteRecipesAll[0].click();
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52977');
  });

  it('Testa se ao clicar na receita, redireciona para a pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />, [rote]);

    const favoriteRecipesAll = screen.getAllByTestId(/-horizontal-image/);
    act(() => {
      favoriteRecipesAll[1].click();
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/15997');
  });

  it('Testa se localstorage estive key alcoholicOrNot, mostra testo \'Optional alcohol\'', () => {
    renderWithRouter(<App />, [rote]);

    const textAllTop = screen.getAllByTestId(/-horizontal-top-text/);
    expect(textAllTop[2].innerHTML).toBe('Optional alcohol');
  });

  it('Teste de ao clicar no nome da receita, redireciona para a pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />, [rote]);

    const favoriteRecipesAll = screen.getAllByTestId(/-horizontal-name/);
    act(() => {
      favoriteRecipesAll[0].click();
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52977');
  });

  it('Teste de ao clicar no nome da receita, redireciona para a pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />, [rote]);

    const favoriteRecipesAll = screen.getAllByTestId(/-horizontal-name/);
    act(() => {
      favoriteRecipesAll[1].click();
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/15997');
  });
});
