import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ButtonsFavoriteShare from '../components/ButtonsFavoriteShare';

export default function MealsInProgress({ match: { params: { id } } }) {
  const {
    finishedRecipes,
    setFinishedRecipes,
  } = useContext(AppContext);

  const [inProgress, setInProgress] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: {},
      meals: {},
    },
  );
  const [detailsRecipes, setDetailsRecipes] = useState();
  const history = useHistory();
  // const [isDisabled, setIsDisabled] = useState(true);

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
    const fetchDetails = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDetailsRecipes(data.meals);
    };
    fetchDetails();
  }, [id, setDetailsRecipes]);

  function details() {
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
  }

  // const enableButton = () => {
  //   const ingredients = details();
  //   const checkedIngredients = inProgress.meals[id] || [];
  //   if (ingredients.length === checkedIngredients.length) {
  //     setIsDisabled(false);
  //   }
  // };

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
      { detailsRecipes && (
        <div>
          <h1 data-testid="recipe-title">{detailsRecipes[0].strMeal}</h1>
          <h2 data-testid="recipe-category">{detailsRecipes[0].strCategory}</h2>
          <img
            src={ detailsRecipes[0].strMealThumb }
            alt={ detailsRecipes[0].strMeal }
            data-testid="recipe-photo"
          />
          <h3>Ingredients</h3>
          {details().map((item, index) => (
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
                  id={ `${item.ingredient}` }
                  value={ item.ingredient }
                  onChange={ (event) => doneStep(event) }
                  checked={ inProgress.meals[id]
                  && inProgress.meals[id].includes(item.ingredient) }
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
        // disabled={ isDisabled }
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
