import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import './index.css';

function CategoryList() {
  const {
    categoryArrayMeals,
    categoryArrayDrinks,
    setCategoryArrayMeals,
    setCategoryArrayDrinks,
    setMealsArray,
  } = useContext(AppContext);
  const [isClicked, setIsClicked] = useState('');
  const location = useLocation();
  const limit = 5;

  const fetchCategoryMeals = useCallback(async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    setCategoryArrayMeals(data.meals);
  }, [setCategoryArrayMeals]);

  const fetchCategoryDrinks = useCallback(async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    setCategoryArrayDrinks(data.drinks);
  }, [setCategoryArrayDrinks]);

  useEffect(() => {
    fetchCategoryMeals();
    fetchCategoryDrinks();
  }, [fetchCategoryMeals, fetchCategoryDrinks]);

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
        const data = await response.json();
        setMealsArray(data.meals);
      }

      if (location.pathname === '/drinks') {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setMealsArray(data.drinks);
      }

      setIsClicked('');
    }
  };

  const handleClickAll = async () => {
    if (location.pathname === '/meals') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setMealsArray(data.meals);
    }

    if (location.pathname === '/drinks') {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setMealsArray(data.drinks);
    }

    setIsClicked('');
  };

  return (
    <div className="categoryFilters">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleClickAll() }
      >
        All
      </button>
      { location.pathname === '/meals'
        ? categoryArrayMeals && categoryArrayMeals.slice(0, limit).map((meal, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${meal.strCategory}-category-filter` }
            onClick={ () => handleClick(meal.strCategory) }
          >
            {meal.strCategory}
          </button>
        ))
        : categoryArrayDrinks
          && categoryArrayDrinks.slice(0, limit).map((drink, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `${drink.strCategory}-category-filter` }
              onClick={ () => handleClick(drink.strCategory) }
            >
              {drink.strCategory}
            </button>
          ))}
    </div>
  );
}

export default CategoryList;
