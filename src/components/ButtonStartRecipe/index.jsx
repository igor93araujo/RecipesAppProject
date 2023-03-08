import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ButtonStartRecipe({ url, id }) {
  const history = useHistory();
  const handleClick = () => {
    if (url === 'drinks') {
      history.push(`/drinks/${id}/in-progress`);
    } else if (url === 'meals') {
      console.log('meals');
      history.push(`/meals/${id}/in-progress`);
    }
  };

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      style={ { position: 'fixed', bottom: '0', right: '50%' } }
      onClick={ () => handleClick() }
    >
      Continue Recipe
    </button>
  );
}

ButtonStartRecipe.propTypes = {}.isRequired;
