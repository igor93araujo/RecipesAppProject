import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ButtonsFavoriteShare from '../components/ButtonsFavoriteShare';
import './style/InProgress.css';

function DrinksInProgress({ match: { params: { id } } }) {
  const [details, setDetails] = useState([]);
  const [inProgress, setInProgress] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) !== null
      ? JSON.parse(localStorage.getItem('inProgressRecipes')) : {
        drinks: {},
        meals: {},
      },
  );

  const [doneFinish, setDoneFinish] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')) !== null
      ? JSON.parse(localStorage.getItem('doneRecipes')) : [],
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

  const handleFinishRecipe = () => {
    const doneRecipe = {
      id: details[0].idDrink,
      nationality: '',
      name: details[0].strDrink,
      category: details[0].strCategory,
      image: details[0].strDrinkThumb,
      tags: details[0].strTags ? details[0].strTags.split(',') : [],
      alcoholicOrNot: details[0].strAlcoholic,
      type: 'drink',
      doneDate: new Date().toISOString(),
    };
    setDoneFinish([...doneFinish, doneRecipe]);
    localStorage.setItem('doneRecipes', JSON.stringify([...doneFinish, doneRecipe]));
    history.push('/done-recipes');
  };

  return (
    <section className="inProgressContainer">
      <div className="detailMealsTitle">DrinksInProgress</div>
      {details && details.map((detail, index) => (
        <div key={ index }>
          <div className="detailBanner">
            <img
              data-testid="recipe-photo"
              src={ detail.strDrinkThumb }
              alt={ detail.strDrinks }
            />
            <h1
              className="recipeTitle"
              data-testid="recipe-title"
            >
              {detail.strDrinks}

            </h1>
          </div>
          <div className="itemInfos">
            <div className="category">
              <h2 data-testid="recipe-category">{detail.strCategory}</h2>
            </div>
            <div className="steps">
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
            </div>
            <div className="instructionsList">
              <h3>Instructions</h3>
              <p data-testid="instructions">{detail.strInstructions}</p>
            </div>
          </div>
        </div>
      ))}
      <ButtonsFavoriteShare id={ id } type={ details } />
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !allIngredientsChecked }
        onClick={ () => handleFinishRecipe() }
        className="finishRecipeBtn"
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
