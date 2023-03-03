import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

import './Meals.css';

function Meals() {
  return (
    <section className="mealsContainer">
      <Header title="Meals" isIconProfile isIconSearch />
      <SearchBar />
    </section>
  );
}

export default Meals;
