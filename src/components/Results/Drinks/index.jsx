import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';

export default function DrinksResult() {
  const {
    mealsArray,
  } = useContext(AppContext);
  return (
    <div className="mealsResults">
      {
        mealsArray && mealsArray.drinks && mealsArray.drinks.map((meal, index) => (
          <div key={ index } className="meal">
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
