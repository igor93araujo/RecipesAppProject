import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('2 - Teste da tela de comidas', () => {
  it('2.1 - Teste se a página renderiza corretamente', () => {
    renderWithRouter(<App />, ['/meals']);

    const pageTitle = screen.getByRole('heading', { name: 'Meals', level: 1 });
    const searchButton = screen.getByTestId('search-top-btn');
    const profileButton = screen.getByTestId('profile-top-btn');

    expect(pageTitle).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
  });

  it('2.2 - Teste ao clicar no icone perfil e redirecionado para pagina profile', () => {
    renderWithRouter(<App />, ['/meals']);

    const profileButton = screen.getByTestId('profile-top-btn');

    waitFor(() => {
      userEvent.click(profileButton);
      const headerProfile = screen.getByRole('heading', { name: 'Profile', level: 1 });
      expect(headerProfile).toBeInTheDocument();
    });
  });

  it('2.3 - Teste ao clicar no icone de busca e redirecionado para pagina de busca', () => {
    renderWithRouter(<App />, ['/meals']);

    const searchInput = screen.queryByTestId('search-input');
    const searchButton = screen.getByTestId('search-top-btn');

    expect(searchInput).not.toBeInTheDocument();

    waitFor(() => {
      userEvent.click(searchButton);
      expect(searchInput).toBeInTheDocument();
    });
  });
});
