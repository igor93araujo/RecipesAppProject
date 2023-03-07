import React from 'react';

export default function ButtonStartRecipe() {
  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      style={ { position: 'fixed', bottom: '0', right: '50%' } }
    >
      Start Recipe
    </button>
  );
}
