import React from 'react';
// import { useLocation } from 'react-router-dom';
import CategoryList from '../components/CategoryList';
import Footer from '../components/Footer/Index';
import Header from '../components/Header';
// import DrinksResult from '../components/Results/Drinks';
import MealsResult from '../components/Results/Meels';
import SearchBar from '../components/SearchBar';

import './Meals.css';

function Meals() {
  return (
    <section className="mealsContainer">
      <Header title="Meals" isIconProfile isIconSearch />
      <SearchBar />
      <CategoryList />
      <MealsResult />
      <Footer />
    </section>
  );
}

export default Meals;
