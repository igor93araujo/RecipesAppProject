import React from 'react';
import PropTypes from 'prop-types';

export default function MealsInProgress({ match: { params: { id } } }) {
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
