import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Recomendations from '../components/Recomendations';
import ButtonStartRecipe from '../components/ButtonStartRecipe';
import ButtonsFavoriteShare from '../components/ButtonsFavoriteShare';
import './Details.css';

export default function DetailsDrinks({ match: { params: { id } } }) {
  const [detailsDrink, setDrinkDetails] = useState([]);

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

  return (
    <section className="fullSection">
      <h1 className="detailMealsTitle">Details Drinks</h1>
      {
        detailsDrink.length > 0
          ? (
            <>
              <div className="detailBanner">
                <img
                  src={ detailsDrink[0].strDrinkThumb }
                  alt={ detailsDrink[0].strImageAttribution }
                  data-testid="recipe-photo"
                />
                <h1
                  data-testid="recipe-title"
                  className="recipeTitle"
                >
                  {detailsDrink[0].strDrink}
                </h1>
              </div>
              <div className="itemDetail">
                <div className="itemInfos">
                  <div className="category">
                    <p data-testid="recipe-category">{detailsDrink[0].strAlcoholic}</p>
                  </div>
                  <div className="ingredientsList">
                    <h2>Ingredients</h2>
                    <ul>
                      {ingredients.map((ingrediente, index) => {
                        let iten = null;
                        if (ingrediente) {
                          iten = (
                            <li
                              key={ ingrediente }
                              data-testid={ `${index}-ingredient-name-and-measure` }
                            >
                              {ingrediente}
                              {' '}
                              {medidas[index]}
                            </li>);
                        }
                        return iten;
                      })}
                    </ul>
                  </div>
                  <div className="ingredientsList">
                    <h2>Instructions</h2>
                    <p data-testid="instructions">{detailsDrink[0].strInstructions}</p>
                  </div>
                  <ButtonsFavoriteShare id={ id } type={ detailsDrink } />
                </div>
              </div>

            </>

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
