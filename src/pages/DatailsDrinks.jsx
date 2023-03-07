import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Recomendations from '../components/Recomendations';
import ButtonStartRecipe from '../components/ButtonStartRecipe';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import image from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DetailsDrinks({ match: { params: { id } } }) {
  const [detailsDrink, setDrinkDetails] = useState([]);
  const [favoriteDrink, setFavoriteDrink] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
      ? JSON.parse(localStorage.getItem('favoriteRecipes'))
        .some((item) => item.id === id) : false,
  );
  const [checkTheLinkCopied, setCheckTheLinkCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const ingredients = [];
  const medidas = [];

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setDrinkDetails(data.drinks));
  }, [id]);

  const obj = detailsDrink[0];
  if (obj !== undefined) {
    Object.keys(obj).forEach((key) => {
      if (key.startsWith('strIngredient')) {
        ingredients.push(obj[key]);
      }
    });
    Object.keys(obj).forEach((key) => {
      if (key.startsWith('strMeasure')) {
        medidas.push(obj[key]);
      }
    });
  }

  const handleClickShare = () => {
    const url = window.location.href;
    copy(url);
    setCheckTheLinkCopied(true);
  const addFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites) {
      const isFavorite = favorites.some((item) => item.id === detailsDrink[0].idDrink);
      if (isFavorite) {
        const newFavorites = favorites
          .filter((item) => item.id !== detailsDrink[0].idDrink);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
        setFavoriteDrink(false);
      } else {
        const newFavorite = {
          id: detailsDrink[0].idDrink,
          type: 'drink',
          nationality: '',
          category: detailsDrink[0].strCategory,
          alcoholicOrNot: detailsDrink[0].strAlcoholic,
          name: detailsDrink[0].strDrink,
          image: detailsDrink[0].strDrinkThumb,
        };
        localStorage
          .setItem('favoriteRecipes', JSON.stringify([...favorites, newFavorite]));
        setFavoriteDrink(true);
      }
    } else {
      const newFavorite = {
        id: detailsDrink[0].idDrink,
        type: 'drink',
        nationality: '',
        category: detailsDrink[0].strCategory,
        alcoholicOrNot: detailsDrink[0].strAlcoholic,
        name: detailsDrink[0].strDrink,
        image: detailsDrink[0].strDrinkThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
      setFavoriteDrink(true);
    }
  };

  return (
    <section>
      <h1>Details Drinks</h1>
      {
        detailsDrink.length > 0
          ? (
            <div>
              <img
                src={ detailsDrink[0].strDrinkThumb }
                alt={ detailsDrink[0].strImageAttribution }
                data-testid="recipe-photo"
              />
              <h1 data-testid="recipe-title">{ detailsDrink[0].strDrink }</h1>
              <p data-testid="recipe-category">{ detailsDrink[0].strAlcoholic }</p>
              <p data-testid="instructions">{ detailsDrink[0].strInstructions }</p>
              <div>
                <ul>
                  {
                    ingredients.map((ingrediente, index) => {
                      let iten = null;
                      if (ingrediente) {
                        iten = (
                          <li
                            key={ ingrediente }
                            data-testid={ `${index}-ingredient-name-and-measure` }
                          >
                            { ingrediente }
                            {' '}
                            { medidas[index] }
                          </li>);
                      }
                      return iten;
                    })
                  }
                </ul>
              </div>
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
                  onClick={ () => addFavorite() }
                  className="favorite"
                >
                  <img
                    data-testid="favorite-btn"
                    src={ favoriteDrink ? blackHeartIcon : whiteHeartIcon }
                    alt="favorite"
                  />
                </button>
                {
                  !checkTheLinkCopied
                    ? ''
                    : <p>Link copied!</p>
                }
              </div>
            </div>
          )
          : null
      }
      <Recomendations />
      <ButtonStartRecipe url="drinks" id={ id } />
    </section>
  );
}

DetailsDrinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
