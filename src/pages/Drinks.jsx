import React from 'react';
import { useLocation } from 'react-router-dom';
import Headers from '../components/Header';
import DrinksResult from '../components/Results/Drinks';
import MealsResult from '../components/Results/Meels';

import SearchBar from '../components/SearchBar';

function Drinks() {
  return (
    <section>
      <Headers title="Drinks" isIconProfile isIconSearch />
      <SearchBar />
      {
        useLocation().pathname === '/meals'
          ? <MealsResult />
          : <DrinksResult />
      }
    </section>
  );
}

export default Drinks;
