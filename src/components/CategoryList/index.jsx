import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

function CategoryList() {
  const {
    categoryArrayMeals,
    categoryArrayDrinks,
    setMealsArray,
  } = useContext(AppContext);
  const location = useLocation();

  const handleClick = async (category) => {
    switch (category) {
    case 'All':
      if (location.pathname === '/meals') {
        const url = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await url.json();
        return setMealsArray(data.meals);
      }

      if (location.pathname === '/drinks') {
        const url = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await url.json();
        return setMealsArray(data.drinks);
      }
      break;
    default:
      if (location.pathname === '/meals') {
        const mealsByCategory = categoryArrayMeals
          .filter((meal) => meal.strCategory === category);
        const url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealsByCategory[0].strCategory}`);
        const data = await url.json();
        const limit = 12;
        const meals = data.meals.slice(0, limit);
        return setMealsArray(meals);
      }

      if (location.pathname === '/drinks') {
        const drinksByCategory = categoryArrayDrinks
          .filter((drink) => drink.strCategory === category);
        const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinksByCategory[0].strCategory}`);
        const data = await url.json();
        return setMealsArray(data.drinks);
      }
      break;
    }
  };

  return (
    <div>
      { location.pathname === '/meals'
        ? categoryArrayMeals.map((meal, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${meal.strCategory}-category-filter` }
            onClick={ () => handleClick(meal.strCategory) }
          >
            {meal.strCategory}
          </button>
        ))
        : categoryArrayDrinks.map((drink, index) => (
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
        onClick={ () => handleClick('All') }
      >
        All
      </button>
    </div>
  );
}

export default CategoryList;
