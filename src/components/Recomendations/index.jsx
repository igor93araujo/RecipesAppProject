import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

export default function Recomendations() {
  const {
    mealsRecomendation,
    setMealsRecomendation,
    drinksRecomendation,
    setDrinksRecomendation,
  } = useContext(AppContext);

  const history = useHistory();

  const fetchMealsRecomendations = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setMealsRecomendation(data.meals);
  };

  const fetchDrinksRecomendations = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setDrinksRecomendation(data.drinks);
  };

  useEffect(() => {
    if (history.location.pathname.includes('/meals')) {
      fetchDrinksRecomendations();
    } else {
      fetchMealsRecomendations();
    }
  }, []);

  return (
    <div>
      {
        history.location.pathname.includes('/meals')
          ? drinksRecomendation && drinksRecomendation.map((meal, index) => (
            <div key={ index }>
              <img src={ meal.strMealThumb } alt={ meal.strMeal } />
              <p data-testid={ `${index}-recomendation-title` }>{ meal.strMeal }</p>
            </div>
          ))
          : mealsRecomendation && mealsRecomendation.map((drink, index) => (
            <div key={ index }>
              <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
              <p data-testid={ `${index}-recomendation-title` }>{ drink.strDrink }</p>
            </div>
          ))
      }
    </div>
  );
}
