import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Index';

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
        useLocation().pathname === '/drinks'
          ? <DrinksResult />
          : <MealsResult />
      }
      <Footer />
    </section>
  );
}

export default Drinks;
