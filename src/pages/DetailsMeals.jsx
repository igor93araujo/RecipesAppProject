import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import Recomendations from '../components/Recomendations';
import ButtonStartRecipe from '../components/ButtonStartRecipe';
import './Details.css';

export default function DetailsMeals({ match: { params: { id } } }) {
  const [detailsMeals, setDetailsMeals] = useState('');

  const ingredients = [];
  const medidas = [];

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((respose) => respose.json())
      .then((data) => setDetailsMeals(data.meals));
  }, [id]);

  const obj = detailsMeals[0];
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
      <h1>Details Meals</h1>
      {
        detailsMeals.length > 0
          ? (
            <div className="itemDetail">
              <img
                src={ detailsMeals[0].strMealThumb }
                alt={ detailsMeals[0].strMeal }
                data-testid="recipe-photo"
              />
              <h1 data-testid="recipe-title">{ detailsMeals[0].strMeal }</h1>
              <p data-testid="recipe-category">{ detailsMeals[0].strCategory }</p>
              <p data-testid="instructions">{ detailsMeals[0].strInstructions }</p>
              <div
                className="react-player"
              >
                <ReactPlayer
                  url={ detailsMeals[0].strYoutube }
                  data-testid="video"
                />
              </div>
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
            </div>
          )
          : null
      }
      <Recomendations />
      <ButtonStartRecipe />
    </section>
  );
}

DetailsMeals.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
