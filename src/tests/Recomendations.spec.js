import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { MockDrinksRecomendation } from './helpers/MockRecomendation/MockDrinksRecomendation';

describe('Testa o componente Recomendations.js', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(MockDrinksRecomendation),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Testa se o componente contém 6 elementos', async () => {
    const { history } = renderWithRouter(<App />, ['/meals']);

    const { pathname } = history.location;

    waitFor(() => {
      const recomendations = screen.getByTestId('recomendations');
      expect(recomendations).toBeInTheDocument();

      const firstELement = screen.getByTestId('0-recipe-card');

      userEvent.click(firstELement);

      expect(pathname).toBe('/meals/52977');
      expect(recomendations.children.length).toBe(6);
    });
  });
});
