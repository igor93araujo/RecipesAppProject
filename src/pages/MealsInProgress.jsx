import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';
import './Progress.css';

export default function MealsInProgress({ match: { params: { id } } }) {
  const { detailsRecipes, setDetailsRecipes } = useContext(AppContext);
  // const [inProgressRecipes, setInProgressRecipes] = useState(
  //   JSON.parse(localStorage.getItem('inProgressRecipes')) || {
  //     meals: {
  //       id: [],
  //     },
  //     drinks: {
  //       id: [],
  //     },
  //   },
  // );

  // const saveProgress = () => {
  //   const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   if (inProgressRecipes) {
  //     const inProgress = inProgressRecipes.meals[id];
  //     if (inProgress) {
  //       const newInProgress = inProgressRecipes
  //         .filter((item) => item.id !== detailsDrink[0].idDrink);
  //       localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgress));
  //     }
  //   }
  // };

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

    const doneStep = ({ target }) => {
      const done = target.parentNode;
      const ingredient = target.value;
      console.log(ingredient);
      done.classList.toggle('done');
    };

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
            >
              {item.ingredient}
              -
              {item.measure}
              <input
                type="checkbox"
                id={ `${index}-ingredient-step` }
                value={ item.ingredient }
                onChange={ (e) => doneStep(e) }
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
      <h1>MealsInProgress</h1>
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

MealsInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
