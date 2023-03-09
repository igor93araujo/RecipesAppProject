import React, { useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';

import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import image from '../../images/shareIcon.svg';

import './styles.css';

function ButtonsFavoriteShare({ id, type }) {
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
      ? JSON.parse(localStorage.getItem('favoriteRecipes')).some((item) => item.id === id)
      : false,
  );
  const [checkTheLinkCopied, setCheckTheLinkCopied] = useState(false);
  const location = window.location.href;

  const addFavorite = () => {
    // add the recipe in progress to favorite recipes (meals or drinks) and save it in localStorage
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (type[0].strCategory && !type[0].strAlcoholic) {
      favoriteRecipes.push({
        id,
        type: 'meal',
        nationality: type[0].strArea,
        category: type[0].strCategory,
        alcoholicOrNot: '',
        name: type[0].strMeal,
        image: type[0].strMealThumb,
      });
    }
    if (type[0].strAlcoholic) {
      favoriteRecipes.push({
        id,
        type: 'drink',
        nationality: '',
        category: type[0].strCategory,
        alcoholicOrNot: type[0].strAlcoholic,
        name: type[0].strDrink,
        image: type[0].strDrinkThumb,
      });
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    setFavorite(true);

    // remove the recipe in progress from favorite recipes (meals or drinks) and save it in localStorage
    if (favorite) {
      const removeFavorite = favoriteRecipes.filter((item) => item.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
      setFavorite(false);
    }
  };

  const handleClickShare = () => {
    // copy to clipboard the link of the recipe in progress (meals or drinks)
    if (location === `http://localhost:3000/meals/${id}/in-progress`) {
      copy(`http://localhost:3000/meals/${id}`);
    } else {
      copy(`http://localhost:3000/drinks/${id}`);
    }
    setCheckTheLinkCopied(true);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => handleClickShare() }
      >
        <img
          src={ image }
          alt="img"
          style={ { height: '20px', width: '20px' } }
        />
      </button>
      <button
        type="button"
        onClick={ addFavorite }
        className="favorite"
      >
        <img
          data-testid="favorite-btn"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
        />
      </button>
      {
        !checkTheLinkCopied
          ? ''
          : <p>Link copied!</p>
      }
    </div>
  );
}

ButtonsFavoriteShare.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default ButtonsFavoriteShare;
