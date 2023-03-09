import React, { useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function DrinksInProgress({ match: { params: { id } } }) {
  const {
    detailsRecipes,
    setDetailsRecipes,
    finishedRecipes,
    setFinishedRecipes,
  } = useContext(AppContext);

  const history = useHistory();

  const [inProgress, setInProgress] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: {},
      meals: {},
    },
  );

  const markedIngredient = useRef([]);

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

    markedIngredient.current = result.map((item) => item.ingredient);

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

  const finishRecipe = () => {
    const { strDrink, strDrinkThumb } = detailsRecipes[0];
    const recipe = {
      id,
      type: history.location.pathname.includes('meals') ? 'meal' : 'drink',
      nationality: detailsRecipes[0].strArea
        ? detailsRecipes[0].strArea : '',
      category: detailsRecipes[0].strCategory
        ? detailsRecipes[0].strCategory : '',
      alcoholicOrNot: detailsRecipes[0].strAlcoholic
        ? detailsRecipes[0].strAlcoholic : '',
      name: strDrink,
      image: strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: detailsRecipes[0].strTags
        ? detailsRecipes[0].strTags.split(',') : [],
    };
    setFinishedRecipes(
      [...finishedRecipes, recipe],
    );

    history.push('/receitas-feitas');
    localStorage.setItem('doneRecipes', JSON.stringify([...finishedRecipes, recipe]));
  };

  console.log(inProgress.drinks[id]);
  const test = inProgress.drinks[id];
  console.log(markedIngredient.current);
  const disabled = markedIngredient.current.length !== 0
    ? markedIngredient.current
      .every((item, index) => item === test[index])
    : false;
  console.log(disabled);

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
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => finishRecipe() }
        disabled={ !disabled }
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
