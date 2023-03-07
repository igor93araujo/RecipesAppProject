import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
// import { MockDrinksRecomendation } from './helpers/MockRecomendation/MockDrinksRecomendation';

describe('Testa o componente Recomendations.js', () => {
  it('Testa se o componente contém 6 elementos', () => {
    renderWithRouter(<App />, ['/meals/52977']);

    const recomendations = screen.getByTestId('recomendations');
    expect(recomendations).toBeInTheDocument();
    waitFor(() => {
      expect(recomendations.children.length).toBe(6);
    });
  });

  it('Testa se aparecem apenas 2 recomendações na tela', () => {
    renderWithRouter(<App />, ['/meals/52977']);

    waitFor(() => {
      const FirstRecomendationCard = screen.getByTestId('0-recomendation-card');
      const SecondRecomendationCard = screen.getByTestId('1-recomendation-card');
      expect(FirstRecomendationCard).toBeInTheDocument();
      expect(SecondRecomendationCard).toBeInTheDocument();
    });
  });
});
