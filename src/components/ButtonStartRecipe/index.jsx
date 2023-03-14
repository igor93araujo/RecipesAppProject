import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ButtonStartRecipe.css';

export default function ButtonStartRecipe({ url, id }) {
  const history = useHistory();
  const [recipeStarted, setRecipeStarted] = useState(false);

  useEffect(() => {
    const recipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!recipe) return;

    const isRecipeStarted = url === 'drinks' ? recipe.cocktails[id] : recipe.meals[id];
    if (isRecipeStarted) {
      setRecipeStarted(true);
    }
  }, [id, url]);

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
      className="startRecipe"
    >
      {recipeStarted ? 'Continue recipe' : 'Start recipe'}
    </button>
  );
}

ButtonStartRecipe.propTypes = {}.isRequired;
