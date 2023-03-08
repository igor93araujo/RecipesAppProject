import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';

export default function DrinksInProgress({ match: { params: { id } } }) {
  const { detailsRecipes, setDetailsRecipes } = useContext(AppContext);

  const [inProgress, setInProgress] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: {},
      meals: {},
    },
  );

  const doneStep = ({ target }) => {
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
    const fetchDrink = async () => {
      const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((res) => res.json());
      setDetailsRecipes(drinks);
    };
    fetchDrink();
  }, [id, setDetailsRecipes]);

  function details() {
    const limit = 8;
    const result = [];
    for (let i = 1; i <= limit; i += 1) {
      const ingredient = `strIngredient${i}`;
      const measure = `strMeasure${i}`;
      if (detailsRecipes[0][ingredient] !== null
        && detailsRecipes[0][ingredient] !== '') {
        result.push({
          ingredient: detailsRecipes[0][ingredient],
          measure: detailsRecipes[0][measure],
        });
      }
    }

    const {
      strDrink,
      strCategory,
      strDrinkThumb,
      strInstructions,
    } = detailsRecipes[0];

    return (
      <div>
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <h2 data-testid="recipe-category">{`${strCategory} Alcoholic`}</h2>
        <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
        <h3>Ingredients</h3>
        {result.map((item, index) => (
          <div key={ index }>
            <label
              htmlFor={ `${index}-ingredient-step` }
              data-testid={ `${index}-ingredient-step` }
              id={ `${index}-ingredient-step` }
              className={ inProgress.drinks[id]
                && inProgress.drinks[id].includes(item.ingredient) ? 'done' : '' }
            >
              <span>
                {item.ingredient}
                -
                {item.measure}
              </span>
              <input
                type="checkbox"
                value={ item.ingredient }
                data-testid={ `${index}-ingredient-step` }
                onChange={ (e) => doneStep(e) }
                checked={ inProgress.drinks[id]
                  && inProgress.drinks[id].includes(item.ingredient) }
              />
            </label>
          </div>
        ))}
        <h3>Instructions</h3>
        <p data-testid="instructions">{strInstructions}</p>
      </div>
    );
  }

  return (
    <section>
      <h1>DrinksInProgress</h1>
      { detailsRecipes && details() }
      <button type="button" data-testid="share-btn">
        Share
      </button>
      <button type="button" data-testid="favorite-btn">
        Favorite
      </button>
      <button type="button" data-testid="finish-recipe-btn">
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
