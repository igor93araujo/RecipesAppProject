import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { mockAllDrinks } from './helpers/MockDrinks/mockAllDrinks';
import { mockCategoryDrinks } from './helpers/MockDrinks/mockCategoryDrinks';
import { mockAll } from './helpers/MockMeals/mockAll';
import { mockCategory } from './helpers/MockMeals/mockCategory';
import { mockMealsBeef } from './helpers/MockMeals/mockMealsBeef';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente CategoryList', () => {
  // mock if fetch request is url 'https://www.themealdb.com/api/json/v1/1/search.php?s='
  const mockFetch = (url) => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve({
        json: () => Promise.resolve(mockAll),
      });
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve({
        json: () => Promise.resolve(mockAllDrinks),
      });
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve({
        json: () => Promise.resolve(mockCategory),
      });
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve({
        json: () => Promise.resolve(mockCategoryDrinks),
      });
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') {
      return Promise.resolve({
        json: () => Promise.resolve(mockMealsBeef),
      });
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink') {
      return Promise.resolve({
        json: () => Promise.resolve(mockCategoryDrinks),
      });
    }
  };

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Teste se url for /meals, deve mostrar a lista de categorias', async () => {
    await act(async () => renderWithRouter(<App />, ['/meals']));
    const categories = await screen.findAllByTestId(/-category-filter/);
    expect(categories.length).toBe(6);
  });

  it('Teste se url for /drinks, deve mostrar a lista de categorias', async () => {
    await act(async () => renderWithRouter(<App />, ['/drinks']));
    const categories = await screen.findAllByTestId(/-category-filter/);
    expect(categories.length).toBe(6);
  });

  it('Teste se url for meals, deve mostras apaneas 12 cards de receitas', async () => {
    await act(async () => renderWithRouter(<App />, ['/meals']));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
  });

  it('Teste se clicar \'Beef\' deve mostrar apenas as receitas de carne', async () => {
    await act(async () => renderWithRouter(<App />, ['/meals']));
    const category = await screen.findByTestId('Beef-category-filter');
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
    // teste se clicar em all retorna a lista de receitas
    const all = await screen.findByTestId('All-category-filter');
    await act(async () => userEvent.click(all));
    const cardsAll = await screen.findAllByTestId(/-recipe-card/);
    expect(cardsAll.length).toBe(12);
  });

  it('Teste se clicar \'Ordinary Drink\' deve mostrar apenas as receitas de drinks', async () => {
    await act(async () => renderWithRouter(<App />, ['/drinks']));
    const category = await screen.findByTestId('Ordinary Drink-category-filter');
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(11);
    // teste se clicar em all retorna a lista de receitas
    const all = await screen.findByTestId('All-category-filter');
    await act(async () => userEvent.click(all));
    const cardsAll = await screen.findAllByTestId(/-recipe-card/);
    expect(cardsAll.length).toBe(12);
  });
});
