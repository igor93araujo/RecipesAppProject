import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const rote = '/done-recipes';
const filterByAllTestId = 'filter-by-all-btn';
const filterByMealTestId = 'filter-by-meal-btn';
const filterByDrinkTestId = 'filter-by-drink-btn';

describe('Testa a pagina Receitas Prontas', () => {
  const doneRecipesLocalStorage = [
    {
      id: '52977',
      nationality: 'Turkish',
      name: 'Corba',
      category: 'Side',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      tags: ['Soup'],
      alcoholicOrNot: '',
      type: 'meal',
      doneDate: '2023-03-11T00:30:43.108Z' },
    {
      id: '17222',
      nationality: '',
      name: 'A1',
      category: 'Cocktail',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      tags: [],
      alcoholicOrNot: 'Alcoholic',
      type: 'drink',
      doneDate: '2023-03-11T00:31:04.266Z',
    },
    {
      id: '53060',
      nationality: 'Croatian',
      name: 'Burek',
      category: 'Side',
      image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
      tags: ['Streetfood', ' Onthego'],
      alcoholicOrNot: '',
      type: 'meal',
      doneDate: '2023-03-11T00:53:20.769Z',
    },
  ];

  // mock copy lib
  const copy = jest.fn();
  global.navigator.clipboard = { writeText: copy };

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesLocalStorage));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Testa se a pagina contem as informacoes de done', () => {
    renderWithRouter(<App />, [rote]);

    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.queryByTestId('search-top-btn');
    const title = screen.getByTestId('page-title');
    const favoriteRecipesAll = screen.getAllByTestId(/-horizontal-image/);
    const textAllTop = screen.getAllByTestId(/-horizontal-top-text/);
    const textAllName = screen.getAllByTestId(/-horizontal-name/);
    const allTags = screen.getAllByTestId(/-horizontal-tag/);
    const doneDateAll = screen.getAllByTestId(/-horizontal-done-date/);
    const shareAll = screen.getAllByTestId(/-horizontal-share-btn/);
    const favoriteAll = screen.getAllByTestId(/-horizontal-favorite-btn/);
    const filterAll = screen.getByTestId(filterByAllTestId);
    const filterFood = screen.getByTestId(filterByMealTestId);
    const filterDrink = screen.getByTestId(filterByDrinkTestId);

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(filterAll).toBeInTheDocument();
    expect(filterFood).toBeInTheDocument();
    expect(filterDrink).toBeInTheDocument();
    expect(favoriteRecipesAll.length).toBe(3);
    expect(textAllTop.length).toBe(6);
    expect(textAllName.length).toBe(3);
    expect(doneDateAll.length).toBe(3);
    expect(shareAll.length).toBe(3);
    expect(favoriteAll.length).toBe(3);
    expect(allTags.length).toBe(5);
  });

  it('Teste se nome do titulo da pagina é \'Done Recipes\'', () => {
    renderWithRouter(<App />, [rote]);

    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent('Done Recipes');
  });

  it('Teste se nomes dos filtros são \'All\', \'Meals\' e \'Drinks\'', () => {
    renderWithRouter(<App />, [rote]);

    const filterAll = screen.getByTestId(filterByAllTestId);
    const filterFood = screen.getByTestId(filterByMealTestId);
    const filterDrink = screen.getByTestId(filterByDrinkTestId);

    expect(filterAll).toHaveTextContent('All');
    expect(filterFood).toHaveTextContent('Meals');
    expect(filterDrink).toHaveTextContent('Drinks');
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

  it('Testa se ao clicar no botao de filtro, filtra as receitas', () => {
    renderWithRouter(<App />, [rote]);

    const filterAll = screen.getByTestId(filterByAllTestId);
    const filterFood = screen.getByTestId(filterByMealTestId);
    const filterDrink = screen.getByTestId(filterByDrinkTestId);
    const favoriteRecipesAll = screen.getAllByTestId(/-horizontal-image/);
    expect(favoriteRecipesAll.length).toBe(3);

    act(() => {
      filterFood.click();
    });

    const favoriteRecipesAllFood = screen.getAllByTestId(/-horizontal-image/);
    expect(favoriteRecipesAllFood.length).toBe(2);

    act(() => {
      filterDrink.click();
    });

    const favoriteRecipesAllDrink = screen.getAllByTestId(/-horizontal-image/);
    expect(favoriteRecipesAllDrink.length).toBe(1);

    act(() => {
      filterAll.click();
    });

    const favoriteRecipesAllAll = screen.getAllByTestId(/-horizontal-image/);
    expect(favoriteRecipesAllAll.length).toBe(3);
  });

  it('Testa se ao clicar na image 1 receita, redireciona para a pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />, [rote]);

    const favoriteRecipesAll = screen.getAllByTestId(/-horizontal-image/);
    act(() => {
      favoriteRecipesAll[0].click();
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52977');
  });

  it('Testa se ao clicar na image 2 receita, redireciona para a pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />, [rote]);

    const favoriteRecipesAll = screen.getAllByTestId(/-horizontal-image/);
    act(() => {
      favoriteRecipesAll[1].click();
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/17222');
  });

  it('Testa se ao clicar na image 2 receita, redireciona para a pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />, [rote]);

    const favoriteRecipesAll = screen.getAllByTestId(/-horizontal-image/);
    act(() => {
      favoriteRecipesAll[2].click();
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals/53060');
  });

  it('Teste de ao clicar no nome 1 da receita, redireciona para a pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />, [rote]);

    const favoriteRecipesAll = screen.getAllByTestId(/-horizontal-name/);
    act(() => {
      favoriteRecipesAll[0].click();
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52977');
  });

  it('Teste de ao clicar no nome 2 da receita, redireciona para a pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />, [rote]);

    const favoriteRecipesAll = screen.getAllByTestId(/-horizontal-name/);
    act(() => {
      favoriteRecipesAll[1].click();
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/17222');
  });

  it('Teste de ao clicar no nome 3 da receita, redireciona para a pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />, [rote]);

    const favoriteRecipesAll = screen.getAllByTestId(/-horizontal-name/);
    act(() => {
      favoriteRecipesAll[2].click();
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals/53060');
  });

  it('Testa se localstorage estive key alcoholicOrNot, mostra testo \'Alcoholic\'', () => {
    renderWithRouter(<App />, [rote]);

    const textAllTop = screen.getAllByTestId(/-horizontal-top-text/);
    expect(textAllTop[2].innerHTML).toBe('Alcoholic');
  });

  it('Teste se array de tags estiver mais de 1, mostra as tags separadas por virgula', () => {
    renderWithRouter(<App />, [rote]);

    const allTags = screen.getAllByTestId(/-horizontal-tag/);
    expect(allTags[0]).toHaveTextContent('Soup');
    expect(allTags[2]).toHaveTextContent('Streetfood, Onthego');
  });
});
