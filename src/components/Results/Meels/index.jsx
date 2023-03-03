import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import '../styles.css';

export default function MealsResult() {
  const {
    mealsArray,
  } = useContext(AppContext);

  const maxElements = 12;

  return (
    <div className="mealsResults">
      {
        mealsArray && mealsArray.meals && mealsArray.meals
          .slice(0, maxElements)
          .map((meal, index) => (
            <div
              key={ index }
              className="meal"
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
            </div>
          ))
      }
    </div>
  );
}
