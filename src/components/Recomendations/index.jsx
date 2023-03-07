import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Carousel.css';

export default function Recomendations() {
  const [mealsRecomendation, setMealsRecomendation] = useState([]);
  const [drinksRecomendation, setDrinksRecomendation] = useState([]);

  const history = useHistory();

  const maxElements = 6;

  const fetchMealsRecomendations = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setMealsRecomendation(data.meals.slice(0, maxElements));
  };

  const fetchDrinksRecomendations = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setDrinksRecomendation(data.drinks.slice(0, maxElements));
  };

  useEffect(() => {
    console.log(drinksRecomendation);
  }, [drinksRecomendation]);

  useEffect(() => {
    if (history.location.pathname.includes('/meals')) {
      fetchDrinksRecomendations();
    } else {
      fetchMealsRecomendations();
    }
  }, [history.location.pathname]);

  return (
    <div>
      <h1>Sugestions</h1>
      <div className="carousel">
        <div
          className="innerCarousel"
          data-testid="recomendations"
        >
          {
            history.location.pathname.includes('/meals')
              ? drinksRecomendation.map((meal, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <div
                    className="item-title"
                  >
                    <p
                      data-testid={ `${index}-recomendation-title` }
                    >
                      { meal.strDrink }

                    </p>
                  </div>
                  <img src={ meal.strDrinkThumb } alt={ meal.strDrink } />
                </div>
              ))
              : mealsRecomendation.map((meal, index) => (
                <div
                  key={ index }
                >
                  <div className="item-title">
                    <p
                      data-testid={ `${index}-recomendation-title` }
                    >
                      { meal.strMeal }

                    </p>
                  </div>
                  <img src={ meal.strMealThumb } alt={ meal.strMeal } />
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
}
