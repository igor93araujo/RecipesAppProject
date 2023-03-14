import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Carousel.css';

export default function Recomendations() {
  const [mealsRecomendation, setMealsRecomendation] = useState([]);
  const [drinksRecomendation, setDrinksRecomendation] = useState([]);

  const history = useHistory();

  const maxElements = 6;
  const magicNumber = 0.5;

  const fetchMealsRecomendations = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setMealsRecomendation(data.meals
      .slice(0, maxElements).sort(() => Math.random() - magicNumber));
  };

  const fetchDrinksRecomendations = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setDrinksRecomendation(data.drinks.slice(0, maxElements)
      .sort(() => Math.random() - magicNumber));
  };

  useEffect(() => {
    if (history.location.pathname.includes('/meals')) {
      fetchDrinksRecomendations();
    } else {
      fetchMealsRecomendations();
    }
  }, [history.location.pathname]);

  return (
    <div className="sugestions">
      <h2>Recommended</h2>
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
                  data-testid={ `${index}-recommendation-card` }
                >
                  <div
                    className="item-title"
                  >
                    <p
                      data-testid={ `${index}-recommendation-title` }
                    >
                      { meal.strDrink }

                    </p>
                  </div>
                  <Link to={ `/drinks/${meal.idDrink}` }>
                    <img
                      src={ meal.strDrinkThumb }
                      alt={ meal.strDrink }
                    />
                  </Link>
                </div>
              ))
              : mealsRecomendation.map((meal, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recommendation-card` }
                >
                  <div className="item-title">
                    <p
                      data-testid={ `${index}-recommendation-title` }
                    >
                      { meal.strMeal }

                    </p>
                  </div>
                  <Link to={ `/meals/${meal.idMeal}` }>
                    <img src={ meal.strMealThumb } alt={ meal.strMeal } />
                  </Link>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
}
