import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';

export default function DrinksResult() {
  const [inicialArray, setInicialArray] = useState([]);

  const {
    mealsArray,
  } = useContext(AppContext);
  const maxElements = 12;

  const fetchInitialDrinks = useCallback(async () => {
    const fetching = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await fetching.json();
    setInicialArray(data.drinks);
  }, []);

  useEffect(() => {
    fetchInitialDrinks();
  }, [fetchInitialDrinks]);

  const redirectDetails = (target) => {
    console.log(target);
    window.location.href = `/drinks/${target}`;
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
              onClick={ () => redirectDetails(meal.idDrink) }
            >
              <img
                src={ meal.strDrinkThumb }
                alt={ meal.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{meal.strDrink}</p>
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
                onClick={ () => redirectDetails(meal.idDrink) }
              >
                <img
                  src={ meal.strDrinkThumb }
                  alt={ meal.strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{meal.strDrink}</p>
              </button>
            </div>
          ))
      }
    </div>
  );
}
