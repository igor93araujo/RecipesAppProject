import React from 'react';
import { useHistory } from 'react-router-dom';
import './ButtonStartRecipe.css';

export default function ButtonStartRecipe({ url, id }) {
  const history = useHistory();
  const handleClick = () => {
    if (url === 'drinks') {
      history.push(`/drinks/${id}/in-progress`);
    } else if (url === 'meals') {
      history.push(`/meals/${id}/in-progress`);
    }
  };

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      onClick={ () => handleClick() }
    >
      Continue Recipe
    </button>
  );
}

ButtonStartRecipe.propTypes = {}.isRequired;
