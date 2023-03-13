import React from 'react';
import { screen } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { mockFilterNameMeals } from './helpers/MockMeals/mockFilterNameMeals';

const searchTopBtnTestID = 'search-top-btn';
const seactInputTestID = 'search-input';
const inputRadioIngredientTestID = 'ingredient-search-radio';
const inputRadioNameTestID = 'name-search-radio';
const inputRadioFirstLetterTestID = 'first-letter-search-radio';
const btnSearchTestID = 'exec-search-btn';
// mock alert global
global.alert = jest.fn();

describe('2.1 - Teste request ingredient', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFilterNameMeals),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Teste se ao renderiza a pagina /meals a barra de busca não está visível', async () => {
    await act(() => renderWithRouter(<App />, ['/meals']));
    const searInput = screen.queryByTestId(seactInputTestID);
    const btnSearch = screen.queryByTestId(btnSearchTestID);
    const inputRadioIngredient = screen.queryByTestId(inputRadioIngredientTestID);
    const inputRadioName = screen.queryByTestId(inputRadioNameTestID);
    const inputRadioFirstLetter = screen.queryByTestId(inputRadioFirstLetterTestID);

    expect(searInput).not.toBeInTheDocument();
    expect(btnSearch).not.toBeInTheDocument();
    expect(inputRadioIngredient).not.toBeInTheDocument();
    expect(inputRadioName).not.toBeInTheDocument();
    expect(inputRadioFirstLetter).not.toBeInTheDocument();
  });

  it('Teste se ao renderiza a pagina /drinks a barra de busca não está visível', async () => {
    await act(() => renderWithRouter(<App />, ['/drinks']));
    const searInput = screen.queryByTestId(seactInputTestID);
    const btnSearch = screen.queryByTestId(btnSearchTestID);
    const inputRadioIngredient = screen.queryByTestId(inputRadioIngredientTestID);
    const inputRadioName = screen.queryByTestId(inputRadioNameTestID);
    const inputRadioFirstLetter = screen.queryByTestId(inputRadioFirstLetterTestID);

    expect(searInput).not.toBeInTheDocument();
    expect(btnSearch).not.toBeInTheDocument();
    expect(inputRadioIngredient).not.toBeInTheDocument();
    expect(inputRadioName).not.toBeInTheDocument();
    expect(inputRadioFirstLetter).not.toBeInTheDocument();
  });

  it('Teste se ao clicar no botão de busca a barra de busca é renderizada', async () => {
    await act(() => renderWithRouter(<App />, ['/meals']));
    const btnSearch = screen.getByTestId(searchTopBtnTestID);
    useEvent.click(btnSearch);
    const searInput = screen.getByTestId(seactInputTestID);
    const btnSearchRender = screen.getByTestId(btnSearchTestID);
    const inputRadioIngredient = screen.getByTestId(inputRadioIngredientTestID);
    const inputRadioName = screen.getByTestId(inputRadioNameTestID);
    const inputRadioFirstLetter = screen.getByTestId(inputRadioFirstLetterTestID);

    expect(searInput).toBeInTheDocument();
    expect(btnSearchRender).toBeInTheDocument();
    expect(inputRadioIngredient).toBeInTheDocument();
    expect(inputRadioName).toBeInTheDocument();
    expect(inputRadioFirstLetter).toBeInTheDocument();
  });

  it('Teste se ao clicar no botão de busca a barra de busca é renderizada', async () => {
    await act(() => renderWithRouter(<App />, ['/drinks']));
    const btnSearch = screen.getByTestId(searchTopBtnTestID);
    useEvent.click(btnSearch);
    const searInput = screen.getByTestId(seactInputTestID);
    const btnSearchRender = screen.getByTestId(btnSearchTestID);
    const inputRadioIngredient = screen.getByTestId(inputRadioIngredientTestID);
    const inputRadioName = screen.getByTestId(inputRadioNameTestID);
    const inputRadioFirstLetter = screen.getByTestId(inputRadioFirstLetterTestID);

    expect(searInput).toBeInTheDocument();
    expect(btnSearchRender).toBeInTheDocument();
    expect(inputRadioIngredient).toBeInTheDocument();
    expect(inputRadioName).toBeInTheDocument();
    expect(inputRadioFirstLetter).toBeInTheDocument();
  });

  it('Teste se a barra de busca contém 3 radio buttons', async () => {
    await act(() => renderWithRouter(<App />, ['/meals']));
    const btnSearch = screen.getByTestId(searchTopBtnTestID);
    useEvent.click(btnSearch);
    const inputRadioIngredient = screen.getByTestId(inputRadioIngredientTestID);
    const inputRadioName = screen.getByTestId(inputRadioNameTestID);
    const inputRadioFirstLetter = screen.getByTestId(inputRadioFirstLetterTestID);

    expect(inputRadioIngredient).toBeInTheDocument();
    expect(inputRadioName).toBeInTheDocument();
    expect(inputRadioFirstLetter).toBeInTheDocument();
  });
});
