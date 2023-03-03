import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import DrinksResult from '../components/Results/Drinks';
import MealsResult from '../components/Results/Meels';
import SearchBar from '../components/SearchBar';

import './Meals.css';

function Meals() {
  return (
    <section className="mealsContainer">
      <Header title="Meals" isIconProfile isIconSearch />
      <SearchBar />
      {
        useLocation().pathname === '/meals'
          ? <MealsResult />
          : <DrinksResult />
      }
    </section>
  );
}

export default Meals;
