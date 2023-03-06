import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

export default function Recomendations() {
  const [mealsRecomendation, setMealsRecomendation] = useState([]);
  const [drinksRecomendation, setDrinksRecomendation] = useState([]);

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
    <Carousel fade>
      {
        history.location.pathname.includes('/meals')
          ? drinksRecomendation.map((meal, index) => (
            <Carousel.Item key={ index }>
              <Carousel.Caption>
                <p data-testid={ `${index}-recomendation-title` }>{ meal.strDrink }</p>
              </Carousel.Caption>
              <img src={ meal.strDrinkThumb } alt={ meal.strMeal } />
              <img src={ meal.strDrinkThumb } alt={ meal.strMeal } />
            </Carousel.Item>
          ))
          : mealsRecomendation.map((drink, index) => (
            <Carousel.Item key={ index }>
              <Carousel.Caption>
                <p data-testid={ `${index}-recomendation-title` }>{ drink.strMeal }</p>
              </Carousel.Caption>
              <img src={ drink.strMealThumb } alt={ drink.strDrink } />
              <img src={ drink.strMealThumb } alt={ drink.strDrink } />
            </Carousel.Item>
          ))
      }
    </Carousel>
  );
}
