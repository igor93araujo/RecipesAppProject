import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';

export default function DrinksInProgress({ match: { params: { id } } }) {
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
            >
              {item.ingredient}
              -
              {item.measure}
              <input
                type="checkbox"
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
