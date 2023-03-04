import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';

export default function DrinksResult() {
  const {
    mealsArray,
  } = useContext(AppContext);

  const maxElements = 12;

  const slicedArr = mealsArray && mealsArray.slice(0, maxElements);
  return (
    <div className="mealsResults">
      {
        slicedArr.map((meal, index) => (
          <div
            key={ index }
            className="meal"
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ meal.strDrinkThumb }
              alt={ meal.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{meal.strDrink}</p>
          </div>
        ))
      }
    </div>
  );
}
