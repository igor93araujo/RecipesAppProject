import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { mockFilterName } from './helpers/mockFilterName';
import { mockLetter } from './helpers/mockLetter';
import { mockName } from './helpers/mockName';

const inputRadioIngredientTestId = 'ingredient-search-radio';
const inputRadioNameTestId = 'name-search-radio';
const inputRadioFirstLetterTestId = 'first-letter-search-radio';
const inputSearchTestId = 'search-input';
const buttonSearchTestId = 'exec-search-btn';
const searchButtonTestId = 'search-top-btn';
const profileButtonTestId = 'profile-top-btn';

describe('2 - Teste da tela de comidas', () => {
  it('2.1 - Teste se a página renderiza corretamente', () => {
    renderWithRouter(<App />, ['/meals']);

    const pageTitle = screen.getByRole('heading', { name: 'Meals', level: 1 });
    const searchButton = screen.getByTestId(searchButtonTestId);
    const profileButton = screen.getByTestId(profileButtonTestId);

    expect(pageTitle).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
  });

  it('2.2 - Teste ao clicar no icone perfil e redirecionado para pagina profile', () => {
    renderWithRouter(<App />, ['/meals']);

    const profileButton = screen.getByTestId(profileButtonTestId);

    waitFor(() => {
      userEvent.click(profileButton);
      const headerProfile = screen.getByRole('heading', { name: 'Profile', level: 1 });
      expect(headerProfile).toBeInTheDocument();
    });
  });

  it('2.3 - Teste ao clicar no icone de busca e redirecionado para pagina de busca', () => {
    renderWithRouter(<App />, ['/meals']);

    const searchInput = screen.queryByTestId(inputSearchTestId);
    const radioIngredient = screen.queryByTestId(inputRadioIngredientTestId);
    const radioName = screen.queryByTestId(inputRadioNameTestId);
    const radioFirstLetter = screen.queryByTestId(inputRadioFirstLetterTestId);
    const searchButtonData = screen.queryByTestId(buttonSearchTestId);
    const searchButton = screen.queryByTestId(searchButtonTestId);

    expect(searchInput).not.toBeInTheDocument();
    expect(radioIngredient).not.toBeInTheDocument();
    expect(radioName).not.toBeInTheDocument();
    expect(radioFirstLetter).not.toBeInTheDocument();
    expect(searchButtonData).not.toBeInTheDocument();

    waitFor(() => {
      userEvent.click(searchButton);
      expect(searchInput).toBeInTheDocument();
    });
  });
});

it('2.4 - Teste se a pagina meals inicia sem nenhum card-img', () => {
  renderWithRouter(<App />, ['/meals']);

  const cardMeal = screen.queryAllByTestId(/-card-img/i);

  expect(cardMeal).toHaveLength(0);
});

describe('2.1 - Teste request ingredient', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockFilterName),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('2.4 - Teste ao digitar um ingredient valido e clicar no botao de busca', async () => {
    renderWithRouter(<App />, ['/meals']);

    const searchButton = screen.getByTestId(searchButtonTestId);

    waitFor(async () => {
      userEvent.click(searchButton);
      const searchInput = await screen.findByTestId(inputSearchTestId);
      const radioIngredient = await screen.findByTestId(inputRadioIngredientTestId);
      const radioName = await screen.findByTestId(inputRadioNameTestId);
      const radioFirstLetter = await screen.findByTestId(inputRadioFirstLetterTestId);
      const searchButtonData = await screen.findByTestId(buttonSearchTestId);

      expect(searchInput).toBeInTheDocument();
      expect(radioIngredient).toBeInTheDocument();
      expect(radioName).toBeInTheDocument();
      expect(radioFirstLetter).toBeInTheDocument();

      userEvent.type(searchInput, 'chicken');
      userEvent.click(radioIngredient);
      userEvent.click(searchButtonData);

      // expect 11 cards random meals

      const cardMeal = screen.getAllByTestId(/-card-img/i);
      expect(cardMeal).toHaveLength(11);
    });
  });
});

describe('2.2 - Teste request name', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockName),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('2.5 - Teste ao digitar um nome valido e clicar no botao de busca', async () => {
    renderWithRouter(<App />, ['/meals']);

    const searchButton = screen.getByTestId(searchButtonTestId);

    waitFor(async () => {
      userEvent.click(searchButton);
      const searchInput = await screen.findByTestId(inputSearchTestId);
      const radioIngredient = await screen.findByTestId(inputRadioIngredientTestId);
      const radioName = await screen.findByTestId(inputRadioNameTestId);
      const radioFirstLetter = await screen.findByTestId(inputRadioFirstLetterTestId);
      const searchButtonData = await screen.findByTestId(buttonSearchTestId);

      expect(searchInput).toBeInTheDocument();
      expect(radioIngredient).toBeInTheDocument();
      expect(radioName).toBeInTheDocument();
      expect(radioFirstLetter).toBeInTheDocument();

      userEvent.type(searchInput, 'Arrabiata');
      userEvent.click(radioName);
      userEvent.click(searchButtonData);

      // expect 1 card random meals

      const cardMeal = screen.getAllByTestId(/-card-img/i);
      expect(cardMeal).toHaveLength(1);
    });
  });
});

describe('2.3 - Teste request first letter', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockLetter),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('2.6 - Teste ao digitar uma letra valida e clicar no botao de busca', async () => {
    renderWithRouter(<App />, ['/meals']);

    const searchButton = screen.getByTestId(searchButtonTestId);

    waitFor(async () => {
      userEvent.click(searchButton);
      const searchInput = await screen.findByTestId(inputSearchTestId);
      const radioIngredient = await screen.findByTestId(inputRadioIngredientTestId);
      const radioName = await screen.findByTestId(inputRadioNameTestId);
      const radioFirstLetter = await screen.findByTestId(inputRadioFirstLetterTestId);
      const searchButtonData = await screen.findByTestId(buttonSearchTestId);

      expect(searchInput).toBeInTheDocument();
      expect(radioIngredient).toBeInTheDocument();
      expect(radioName).toBeInTheDocument();
      expect(radioFirstLetter).toBeInTheDocument();

      userEvent.type(searchInput, 'a');
      userEvent.click(radioFirstLetter);
      userEvent.click(searchButtonData);

      // expect 11 cards random meals

      const cardMeal = screen.getAllByTestId(/-card-img/i);
      expect(cardMeal).toHaveLength(4);
    });
  });

  it('2.8 - Teste se ao digita mais 1 uma letra deve aparece uma alert com frase \'Your search must have only 1 (one) character\'', async () => {
    renderWithRouter(<App />, ['/meals']);

    const searchButton = screen.getByTestId(searchButtonTestId);

    waitFor(async () => {
      userEvent.click(searchButton);
      const searchInput = await screen.findByTestId(inputSearchTestId);
      const radioIngredient = await screen.findByTestId(inputRadioIngredientTestId);
      const radioName = await screen.findByTestId(inputRadioNameTestId);
      const radioFirstLetter = await screen.findByTestId(inputRadioFirstLetterTestId);
      const searchButtonData = await screen.findByTestId(buttonSearchTestId);

      expect(searchInput).toBeInTheDocument();
      expect(radioIngredient).toBeInTheDocument();
      expect(radioName).toBeInTheDocument();
      expect(radioFirstLetter).toBeInTheDocument();

      userEvent.type(searchInput, 'ab');
      userEvent.click(radioFirstLetter);
      userEvent.click(searchButtonData);

      // expect 11 cards random meals

      const alert = screen.getByText('Your search must have only 1 (one) character');
      expect(alert).toBeInTheDocument();
    });
  });
});
