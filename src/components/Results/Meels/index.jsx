import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import '../styles.css';

export default function MealsResult() {
  const {
    mealsArray,
  } = useContext(AppContext);

  return (
    <div className="mealsResults">
      {
        mealsArray && mealsArray.meals && mealsArray.meals.map((meal, index) => (
          <div key={ index } className="meal">
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
