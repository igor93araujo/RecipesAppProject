import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function MealsInProgress({ match: { params: { id } } }) {
  const {
    detailsRecipes,
    setDetailsRecipes,
    finishedRecipes,
    setFinishedRecipes,
  } = useContext(AppContext);

  const [inProgress, setInProgress] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: {},
      meals: {},
    },
  );

  const history = useHistory();

  const doneStep = ({ target }) => {
    const ingredient = target.value;

    if (target.checked) {
      if (!inProgress.meals[id]) {
        inProgress.meals[id] = [ingredient];
      } else {
        inProgress.meals[id].push(ingredient);
      }
    }

    if (!target.checked) {
      inProgress.meals[id] = inProgress.meals[id].filter((item) => item !== ingredient);
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));

    setInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
  };

  useEffect(() => {
    const fetchMeal = async () => {
      const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((res) => res.json());
      setDetailsRecipes(meals);
    };
    fetchMeal();
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
      strMeal,
      strCategory,
      strMealThumb,
      strInstructions,
    } = detailsRecipes[0];

    return (
      <div>
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <h2 data-testid="recipe-category">{strCategory}</h2>
        <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
        <h3>Ingredients</h3>
        {result.map((item, index) => (
          <div key={ index }>
            <label
              htmlFor={ `${index}-ingredient-step` }
              data-testid={ `${index}-ingredient-step` }
              className={ inProgress.meals[id]
                && inProgress.meals[id].includes(item.ingredient) ? 'done' : '' }
            >
              {item.ingredient}
              -
              {item.measure}
              <input
                type="checkbox"
                id={ `${index}-ingredient-step` }
                value={ item.ingredient }
                onChange={ (e) => doneStep(e) }
                checked={ inProgress.meals[id]
                  && inProgress.meals[id].includes(item.ingredient) }
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
    const { strMeal, strMealThumb } = detailsRecipes[0];
    const recipe = {
      id,
      type: history.location.pathname.includes('meals') ? 'meal' : 'drink',
      nationality: detailsRecipes[0].strArea
        ? detailsRecipes[0].strArea : '',
      category: detailsRecipes[0].strCategory
        ? detailsRecipes[0].strCategory : '',
      alcoholicOrNot: detailsRecipes[0].strAlcoholic
        ? detailsRecipes[0].strAlcoholic : '',
      name: strMeal,
      image: strMealThumb,
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

  return (
    <section>
      <h1>MealsInProgress</h1>
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
      >
        Finish Recipe
      </button>
    </section>
  );
}

MealsInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
