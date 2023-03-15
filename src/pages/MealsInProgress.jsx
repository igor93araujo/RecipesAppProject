import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ButtonsFavoriteShare from '../components/ButtonsFavoriteShare';
import './style/InProgress.css';

function MealsInProgress({ match: { params: { id } } }) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ingredients = [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let newIngredients = [];
  const medidas = [];
  const limit = 8;

  const doneStep = ({ target }) => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
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

  const obj = details[0];
  if (obj !== undefined) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== '' && key.startsWith('strIngredient')) {
        ingredients.push(obj[key]);
        newIngredients = [...new Set(ingredients)].slice(0, `${limit}`);
      }
    });
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== '' && key.startsWith('strMeasure')) {
        medidas.push(obj[key]);
      }
    });
  }

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setDetails(data.meals));
  }, [id]);

  // Verifica se todos os ingredientes foram marcados como concluídos
  useEffect(() => {
    if (inProgress.meals[id] !== undefined) {
      if (inProgress.meals[id].length === newIngredients.length) {
        setAllIngredientsChecked(true);
      } else {
        setAllIngredientsChecked(false);
      }
    }
  }, [inProgress, newIngredients, id]);

  const history = useHistory();
  const handleFinishRecipe = () => {
    const doneRecipe = {
      id: details[0].idMeal,
      nationality: details[0].strArea,
      name: details[0].strMeal,
      category: details[0].strCategory,
      image: details[0].strMealThumb,
      tags: details[0].strTags ? details[0].strTags.split(',') : [],
      alcoholicOrNot: '',
      type: 'meal',
      doneDate: new Date().toISOString(),
    };
    setDoneFinish([...doneFinish, doneRecipe]);
    localStorage.setItem('doneRecipes', JSON.stringify([...doneFinish, doneRecipe]));
    history.push('/done-recipes');
  };

  return (
    <section className="inProgressContainer">
      <div className="detailMealsTitle">MealsInProgress</div>
      {details && details.map((detail, index) => (
        <div key={ index }>
          <div className="detailBanner">
            <img
              data-testid="recipe-photo"
              src={ detail.strMealThumb }
              alt={ detail.strMeal }
            />
            <h1
              className="recipeTitle"
              data-testid="recipe-title"
            >
              {detail.strMeal}

            </h1>
          </div>
          <div className="itemInfos">
            <div className="category">
              <h2 data-testid="recipe-category">{detail.strCategory}</h2>
            </div>
            <div className="steps">
              <h3>Ingredients</h3>
              {newIngredients.map((ingredient, indice) => (
                <div key={ indice }>
                  <label
                    htmlFor={ `${indice}-ingredient-step` }
                    data-testid={ `${indice}-ingredient-step` }
                    className={ inProgress.meals[id]
                && inProgress.meals[id].includes(ingredient) ? 'done' : '' }
                  >
                    {ingredient}
                    -
                    {medidas[indice]}
                    <input
                      type="checkbox"
                      id={ `${indice}-ingredient-step` }
                      value={ ingredient }
                      onChange={ (e) => doneStep(e) }
                      checked={ inProgress.meals[id]
                  && inProgress.meals[id].includes(ingredient) }
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
        className={
          allIngredientsChecked ? 'finishRecipeButton' : 'finishRecipeButtonDisabled'
        }
      >
        Finish Recipe
      </button>
    </section>
  );
}

MealsInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MealsInProgress;
