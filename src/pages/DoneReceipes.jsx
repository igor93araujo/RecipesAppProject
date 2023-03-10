import React from 'react';
import Header from '../components/Header';

const FinishedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

function DoneReceipes() {
  return (
    <section>
      <Header title="Done Recipes" isIconProfile />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {FinishedRecipes && FinishedRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <h3 data-testid={ `${index}-horizontal-top-text` }>
            {recipe.alcoholicOrNot}
          </h3>
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
          <h3 data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</h3>
          <h3>
            {
              recipe.tags && recipe.tags.map((tag, tagIndex) => (
                <span
                  key={ tagIndex }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </span>
              ))
            }
          </h3>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img
              src="https://img.icons8.com/ios/50/000000/share--v1.png"
              alt="share"
            />
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            <img
              src="https://img.icons8.com/ios/50/000000/filled-like.png"
              alt="favorite"
            />
          </button>
        </div>
      ))}
    </section>
  );
}

export default DoneReceipes;
