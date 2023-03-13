import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { mockFetch, mockFetchDrinks } from './mockFetch';

const allCategoryTestID = 'All-category-filter';

describe('Testa o componente CategoryList', () => {
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
    const all = await screen.findByTestId(allCategoryTestID);
    await act(async () => userEvent.click(all));
    const cardsAll = await screen.findAllByTestId(/-recipe-card/);
    expect(cardsAll.length).toBe(12);
  });

  it('Teste se clicar ao clicar \'Beef-category\' duas vezes no mesmo filtro, deve mostrar a lista de receitas', async () => {
    await act(async () => renderWithRouter(<App />, ['/meals']));
    const category = await screen.findByTestId('Beef-category-filter');
    await act(async () => userEvent.click(category));
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
  });

  it('Teste se clicar \'Breakfast\' deve mostrar apenas as receitas de café da manhã', async () => {
    await act(async () => renderWithRouter(<App />, ['/meals']));
    const category = await screen.findByTestId('Breakfast-category-filter');
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(7);
    // teste se clicar em all retorna a lista de receitas
    const all = await screen.findByTestId(allCategoryTestID);
    await act(async () => userEvent.click(all));
    const cardsAll = await screen.findAllByTestId(/-recipe-card/);
    expect(cardsAll.length).toBe(12);
  });

  it('Teste se clicar ao clicar \'Breakfast-category-filter\' duas vezes no mesmo filtro, deve mostrar a lista de receitas', async () => {
    await act(async () => renderWithRouter(<App />, ['/meals']));
    const category = await screen.findByTestId('Breakfast-category-filter');
    await act(async () => userEvent.click(category));
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
  });

  it('Teste se clicar \'Chicken\' deve mostrar apenas as receitas de frango', async () => {
    await act(async () => renderWithRouter(<App />, ['/meals']));
    const category = await screen.findByTestId('Chicken-category-filter');
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
    // teste se clicar em all retorna a lista de receitas
    const all = await screen.findByTestId(allCategoryTestID);
    await act(async () => userEvent.click(all));
    const cardsAll = await screen.findAllByTestId(/-recipe-card/);
    expect(cardsAll.length).toBe(12);
  });

  it('Teste se clicar ao clicar duas vezes no mesmo filtro, deve mostrar a lista de receitas', async () => {
    await act(async () => renderWithRouter(<App />, ['/meals']));
    const category = await screen.findByTestId('Chicken-category-filter');
    await act(async () => userEvent.click(category));
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
  });

  it('Teste se clicar \'Dessert\' deve mostrar apenas as receitas de sobremesa', async () => {
    await act(async () => renderWithRouter(<App />, ['/meals']));
    const category = await screen.findByTestId('Dessert-category-filter');
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
    // teste se clicar em all retorna a lista de receitas
    const all = await screen.findByTestId(allCategoryTestID);
    await act(async () => userEvent.click(all));
    const cardsAll = await screen.findAllByTestId(/-recipe-card/);
    expect(cardsAll.length).toBe(12);
  });

  it('Teste se clicar ao clicar duas vezes no mesmo filtro, deve mostrar a lista de receitas', async () => {
    await act(async () => renderWithRouter(<App />, ['/meals']));
    const category = await screen.findByTestId('Dessert-category-filter');
    await act(async () => userEvent.click(category));
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
  });
});

describe('Testa o componente CategoryList Drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetchDrinks);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Teste se url for /drinks, deve mostrar a lista de categorias', async () => {
    await act(async () => renderWithRouter(<App />, ['/drinks']));
    const categories = await screen.findAllByTestId(/-category-filter/);
    expect(categories.length).toBe(6);
  });

  it('Teste se clicar \'Ordinary Drink\' deve mostrar apenas as receitas de drinks', async () => {
    await act(async () => renderWithRouter(<App />, ['/drinks']));
    const category = await screen.findByTestId('Ordinary Drink-category-filter');
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
    // teste se clicar em all retorna a lista de receitas
    const all = await screen.findByTestId(allCategoryTestID);
    await act(async () => userEvent.click(all));
    const cardsAll = await screen.findAllByTestId(/-recipe-card/);
    expect(cardsAll.length).toBe(12);
  });

  it('Teste se clicar 2 \'Ordinary Drink\' vezes no mesmo filtro deve renderizar a lista de receitas', async () => {
    await act(async () => renderWithRouter(<App />, ['/drinks']));
    const category = await screen.findByTestId('Ordinary Drink-category-filter');
    await act(async () => userEvent.click(category));
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
  });

  it('Teste se clicar \'Cocktail\' deve mostrar apenas as receitas de drinks', async () => {
    await act(async () => renderWithRouter(<App />, ['/drinks']));
    const category = await screen.findByTestId('Cocktail-category-filter');
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
    // teste se clicar em all retorna a lista de receitas
    const all = await screen.findByTestId(allCategoryTestID);
    await act(async () => userEvent.click(all));
    const cardsAll = await screen.findAllByTestId(/-recipe-card/);
    expect(cardsAll.length).toBe(12);
  });

  it('Teste se clicar 2 \'Cocktail-category-filter\' vezes no mesmo filtro deve renderizar a lista de receitas', async () => {
    await act(async () => renderWithRouter(<App />, ['/drinks']));
    const category = await screen.findByTestId('Cocktail-category-filter');
    await act(async () => userEvent.click(category));
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
  });

  it('Teste se clicar \'Shake\' deve mostrar apenas as receitas de drinks', async () => {
    await act(async () => renderWithRouter(<App />, ['/drinks']));
    const category = await screen.findByTestId('Shake-category-filter');
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
    // teste se clicar em all retorna a lista de receitas
    const all = await screen.findByTestId(allCategoryTestID);
    await act(async () => userEvent.click(all));
    const cardsAll = await screen.findAllByTestId(/-recipe-card/);
    expect(cardsAll.length).toBe(12);
  });

  it('Teste se clicar 2 \'Shake-category-filter\' vezes no mesmo filtro deve renderizar a lista de receitas', async () => {
    await act(async () => renderWithRouter(<App />, ['/drinks']));
    const category = await screen.findByTestId('Shake-category-filter');
    await act(async () => userEvent.click(category));
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
  });

  it('Teste se clicar \'Other / Unknown\' deve mostrar apenas as receitas de drinks', async () => {
    await act(async () => renderWithRouter(<App />, ['/drinks']));
    const category = await screen.findByTestId('Other / Unknown-category-filter');
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
    // teste se clicar em all retorna a lista de receitas
    const all = await screen.findByTestId(allCategoryTestID);
    await act(async () => userEvent.click(all));
    const cardsAll = await screen.findAllByTestId(/-recipe-card/);
    expect(cardsAll.length).toBe(12);
  });

  it('Teste se clicar 2 \'Other / Unknown-category-filter\' vezes no mesmo filtro deve renderizar a lista de receitas', async () => {
    await act(async () => renderWithRouter(<App />, ['/drinks']));
    const category = await screen.findByTestId('Other / Unknown-category-filter');
    await act(async () => userEvent.click(category));
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
  });

  it('Teste se clicar \'Cocoa\' deve mostrar apenas as receitas de drinks', async () => {
    await act(async () => renderWithRouter(<App />, ['/drinks']));
    const category = await screen.findByTestId('Cocoa-category-filter');
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(9);
    // teste se clicar em all retorna a lista de receitas
    const all = await screen.findByTestId(allCategoryTestID);
    await act(async () => userEvent.click(all));
    const cardsAll = await screen.findAllByTestId(/-recipe-card/);
    expect(cardsAll.length).toBe(12);
  });

  it('Teste se clicar 2 vezes no mesmo filtro deve renderizar a lista de receitas', async () => {
    await act(async () => renderWithRouter(<App />, ['/drinks']));
    const category = await screen.findByTestId('Cocoa-category-filter');
    await act(async () => userEvent.click(category));
    await act(async () => userEvent.click(category));
    const cards = await screen.findAllByTestId(/-recipe-card/);
    expect(cards.length).toBe(12);
  });
});
