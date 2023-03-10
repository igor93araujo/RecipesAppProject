import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Profile.js', () => {
  it('Testa se a página contém as informações de perfil', () => {
    renderWithRouter(<App />, ['/profile']);

    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.queryByTestId('search-top-btn');
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
  });
});
