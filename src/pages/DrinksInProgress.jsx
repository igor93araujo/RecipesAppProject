import React from 'react';
import PropTypes from 'prop-types';

export default function MealsInProgress({ match: { params: { id } } }) {
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

  return (
    <section>
      <h1>MealsInProgress</h1>
      <img src="" alt="" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{id}</h2>
      <button
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
      <p data-testid="recipe-category">Category</p>
      <h3>Instructions</h3>
      <p data-testid="instructions">Instructions</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
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
