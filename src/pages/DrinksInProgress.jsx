import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ButtonsFavoriteShare from '../components/ButtonsFavoriteShare';

function DrinksInProgress({ match: { params: { id } } }) {
  const [details, setDetails] = useState([]);
  const [inProgress, setInProgress] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) !== null
      ? JSON.parse(localStorage.getItem('inProgressRecipes')) : {
        drinks: {},
        meals: {},
      },
  );

  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);
  const ingredients = useMemo(() => [], []);
  const medidas = [];
  const limit = 8;

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

  const obj = details[0];
  if (obj !== undefined) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== '' && obj[key] !== null && key.startsWith('strIngredient')) {
        ingredients.push(obj[key]);
      }
    });
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== '' && obj[key] !== null && key.startsWith('strMeasure')) {
        medidas.push(obj[key]);
      }
    });
  }

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setDetails(data.drinks));
  }, [id]);

  useEffect(() => {
    // Verifica se todos os ingredientes foram marcados como concluídos
    const isAllIngredientsChecked = ingredients.slice(0, limit)
      .every((ingredient) => (
        inProgress.drinks[id] && inProgress.drinks[id].includes(ingredient)
      ));
    setAllIngredientsChecked(isAllIngredientsChecked);
  }, [inProgress, ingredients, id, limit]);

  const history = useHistory();

  const finishRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    localStorage.setItem('doneRecipes', JSON.stringify([
      ...doneRecipes,
      {
        id,
        type: history.location.pathname.includes('meals') ? 'meal' : 'drink',
        nationality: details[0].strArea,
        category: details[0].strCategory,
        alcoholicOrNot: details[0].strAlcoholic || '',
        name: details[0].strDrink,
        image: details[0].strDrinkThumb,
        doneDate: new Date().toLocaleDateString(),
        tags: details[0].strTags ? details[0].strTags.split(',') : [],
      },
    ]));

    history.push('/done-recipes');
  };

  return (
    <section>
      <div>DrinksInProgress</div>
      {details && details.map((detail, index) => (
        <div key={ index }>
          <h1 data-testid="recipe-title">{detail.strDrinks}</h1>
          <h2 data-testid="recipe-category">{detail.strCategory}</h2>
          <img
            data-testid="recipe-photo"
            src={ detail.strDrinkThumb }
            alt={ detail.strDrinks }
          />
          <h3>Ingredients</h3>
          {ingredients.slice(0, `${limit}`).map((ingredient, indice) => (
            <div key={ indice }>
              <label
                htmlFor={ `${indice}-ingredient-step` }
                data-testid={ `${indice}-ingredient-step` }
                className={ inProgress.drinks[id]
                && inProgress.drinks[id].includes(ingredient) ? 'done' : '' }
              >
                {ingredient}
                -
                {medidas[indice]}
                <input
                  type="checkbox"
                  id={ `${indice}-ingredient-step` }
                  value={ ingredient }
                  onChange={ (e) => doneStep(e) }
                  checked={ inProgress.drinks[id]
                  && inProgress.drinks[id].includes(ingredient) }
                />
              </label>
            </div>
          ))}
          <h3>Instructions</h3>
          <p data-testid="instructions">{detail.strInstructions}</p>
        </div>
      ))}
      <ButtonsFavoriteShare id={ id } type={ details } />
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !allIngredientsChecked }
        onClick={ () => finishRecipe() }
      >
        Finish Recipe
      </button>
    </section>
  );
}

DrinksInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinksInProgress;
