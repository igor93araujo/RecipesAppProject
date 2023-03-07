import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const searchButtonTestId = 'search-top-btn';
const profileButtonTestId = 'profile-top-btn';

describe('Testa o componente Header.js', () => {
  it('Testa se o header contém os 3 elementos', () => {
    renderWithRouter(<App />, ['/meals']);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header.children.length).toBe(3);
  });

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
    const { history } = renderWithRouter(<App />, ['/meals']);

    const profileButton = screen.getByTestId(profileButtonTestId);
    const { pathname } = history.location;

    waitFor(() => {
      userEvent.click(profileButton);
      const headerProfile = screen.getByRole('heading', { name: 'Profile', level: 1 });
      expect(headerProfile).toBeInTheDocument();
      expect(pathname).toBe('/profile');
    });
  });
});
