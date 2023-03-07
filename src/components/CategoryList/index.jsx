import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

function CategoryList() {
  const {
    categoryArrayMeals,
    categoryArrayDrinks,
    setMealsArray,
  } = useContext(AppContext);
  const [isClicked, setIsClicked] = useState('');
  const location = useLocation();

  const handleClick = async (category) => {
    if (!isClicked || isClicked !== category) {
      if (location.pathname === '/meals') {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        setMealsArray(data.meals);
      }

      if (location.pathname === '/drinks') {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        setMealsArray(data.drinks);
      }

      setIsClicked(category);
    }

    if (isClicked === category) {
      if (location.pathname === '/meals') {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const limit = 12;
        const data = await response.json();
        setMealsArray(data.meals.slice(0, limit));
      }

      if (location.pathname === '/drinks') {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const limit = 12;
        const data = await response.json();
        setMealsArray(data.drinks.slice(0, limit));
      }

      setIsClicked('');
    }
  };

  const handleClickAll = async () => {
    if (location.pathname === '/meals') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const limit = 12;
      const data = await response.json();
      setMealsArray(data.meals.slice(0, limit));
    }

    if (location.pathname === '/drinks') {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const limit = 12;
      const data = await response.json();
      setMealsArray(data.drinks.slice(0, limit));
    }

    setIsClicked('');
  };

  return (
    <div>
      { location.pathname === '/meals'
        ? categoryArrayMeals && categoryArrayMeals.map((meal, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${meal.strCategory}-category-filter` }
            onClick={ () => handleClick(meal.strCategory) }
          >
            {meal.strCategory}
          </button>
        ))
        : categoryArrayDrinks && categoryArrayDrinks.map((drink, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${drink.strCategory}-category-filter` }
            onClick={ () => handleClick(drink.strCategory) }
          >
            {drink.strCategory}
          </button>
        ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleClickAll() }
      >
        All
      </button>
    </div>
  );
}

export default CategoryList;
