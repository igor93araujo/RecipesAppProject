import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ButtonsFavoriteShare from '../components/ButtonsFavoriteShare';
import { AppContext } from '../context/AppContext';

export default function DrinksInProgress({ match: { params: { id } } }) {
  // const {
  //   finishedRecipes,
  //   setFinishedRecipes,
  // } = useContext(AppContext);

  const [inProgress, setInProgress] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) !== null
      ? JSON.parse(localStorage.getItem('inProgressRecipes')) : {
        drinks: {},
        meals: {},
      },
  );
  const { detailsRecipes, setDetailsRecipes } = useContext(AppContext);
  const history = useHistory();
  const isEnable = useRef(true);

  const doneStep = ({ target }) => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    const ingredient = target.value;
    if (target.checked) {
      if (!inProgress.drinks[id]) {
        inProgress.drinks[id] = [ingredient];
      } else {
        inProgress.drinks[id].push(ingredient);
      }
    }
    if (!target.checked) {
      inProgress.drinks[id] = inProgress.drinks[id].filter((item) => item !== ingredient);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    setInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDetailsRecipes(data.drinks);
    };
    fetchDetails();
  }, [id, setDetailsRecipes]);

  const details = useCallback(() => {
    const limit = 8;
    const ingredients = [];
    const measures = [];

    for (let i = 1; i <= limit; i += 1) {
      if (detailsRecipes[0][`strIngredient${i}`]) {
        ingredients.push(detailsRecipes[0][`strIngredient${i}`]);
      }
      if (detailsRecipes[0][`strMeasure${i}`]) {
        measures.push(detailsRecipes[0][`strMeasure${i}`]);
      }
    }

    const ingredientsAndMeasures = ingredients.map((item, index) => ({
      ingredient: item,
      measure: measures[index],
    }));

    return ingredientsAndMeasures;
  }, [detailsRecipes]);

  const handleClick = () => {
    const ingredients = details();
    const ingredientsChecked = inProgress.meals[id];
    if (ingredientsChecked && ingredientsChecked.length === ingredients.length) {
      isEnable.current = false;
      history.push('/done-recipes');
    } else {
      isEnable.current = true;
    }
  };

  return (
    <section>
      <h1>DrinksInProgress</h1>
      { detailsRecipes && (
        <div>
          <h1 data-testid="recipe-title">{detailsRecipes[0].strDrinks}</h1>
          <h2
            data-testid="recipe-category"
          >
            {`${detailsRecipes[0].strCategory} Alcoholic`}
          </h2>
          <img
            src={ detailsRecipes[0].strDrinkThumb }
            alt={ detailsRecipes[0].strDrink }
            data-testid="recipe-photo"
          />
          <h3>Ingredients</h3>
          {details().map((item, index) => (
            <div key={ index }>
              <label
                htmlFor={ `${index}-ingredient-step` }
                data-testid={ `${index}-ingredient-step` }
                className={ inProgress.drinks[id]
                && inProgress.drinks[id].includes(item.ingredient) ? 'done' : '' }
              >
                {item.ingredient}
                -
                {item.measure}
                <input
                  type="checkbox"
                  id={ `${item.ingredient}` }
                  value={ item.ingredient }
                  onChange={ (event) => doneStep(event) }
                  checked={ inProgress.drinks[id]
                  && inProgress.drinks[id].includes(item.ingredient) }
                />
              </label>
            </div>
          ))}
          <h3>Instructions</h3>
          <p data-testid="instructions">{detailsRecipes[0].strInstructions}</p>
        </div>
      ) }
      <ButtonsFavoriteShare id={ id } type={ detailsRecipes } />
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isEnable.current }
        onClick={ handleClick }
      >
        Finish Recipe
      </button>
    </section>
  );
}

DrinksInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
