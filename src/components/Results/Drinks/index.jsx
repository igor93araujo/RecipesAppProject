import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';

export default function DrinksResult() {
  const [inicialArray, setInicialArray] = useState([]);

  const {
    mealsArray,
    // setMealsArray,
  } = useContext(AppContext);

  const maxElements = 12;

  const fetchInitialDrinks = async () => {
    const fetching = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await fetching.json();
    setInicialArray(data.drinks.slice(0, maxElements));
  };

  useEffect(() => {
    fetchInitialDrinks();
  }, []);

  const slicedArr = mealsArray.length === 0
    ? inicialArray : mealsArray.slice(0, maxElements);

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
