import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import '../styles.css';

export default function MealsResult() {
  const [inicialArray, setInicialArray] = useState([]);

  const {
    mealsArray,
  } = useContext(AppContext);
  const maxElements = 12;

  const fetchInitialMeals = async () => {
    const fetching = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await fetching.json();
    setInicialArray(data.meals);
  };

  useEffect(() => {
    fetchInitialMeals();
  }, []);

  const redirectDetails = (target) => {
    console.log(target);
    window.location.href = `/meals/${target}`;
  };

  return (
    <div className="mealsResults">
      {
        mealsArray.length > 0 ? mealsArray.slice(0, maxElements).map((meal, index) => (
          <div
            key={ index }
            className="meal"
            data-testid={ `${index}-recipe-card` }
          >
            <button
              type="button"
              onClick={ () => redirectDetails(meal.idMeal) }
            >
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
            </button>
          </div>
        ))
          : inicialArray && inicialArray.slice(0, maxElements).map((meal, index) => (
            <div
              key={ index }
              className="meal"
              data-testid={ `${index}-recipe-card` }
            >
              <button
                type="button"
                onClick={ () => redirectDetails(meal.idMeal) }
              >
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              </button>
            </div>
          ))
      }
    </div>
  );
}
