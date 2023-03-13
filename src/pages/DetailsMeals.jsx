import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import Recomendations from '../components/Recomendations';
import './Details.css';

import ButtonStartRecipe from '../components/ButtonStartRecipe';
import ButtonsFavoriteShare from '../components/ButtonsFavoriteShare';

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

  const setCategory = (category) => {
    let url = '';
    switch (category) {
    case 'Beef':
      url = 'https://www.themealdb.com/images/category/beef.png';
      break;
    case 'Chicken':
      url = 'https://www.themealdb.com/images/category/chicken.png';
      break;
    case 'Dessert':
      url = 'https://www.themealdb.com/images/category/dessert.png';
      break;
    case 'Goat':
      url = 'https://www.themealdb.com/images/category/goat.png';
      break;
    case 'Lamb':
      url = 'https://www.themealdb.com/images/category/lamb.png';
      break;
    case 'Miscellaneous':
      url = 'https://www.themealdb.com/images/category/miscellaneous.png';
      break;
    case 'Pasta':
      url = 'https://www.themealdb.com/images/category/pasta.png';
      break;
    case 'Pork':
      url = 'https://www.themealdb.com/images/category/pork.png';
      break;
    case 'Seafood':
      url = 'https://www.themealdb.com/images/category/seafood.png';
      break;
    case 'Side':
      url = 'https://www.themealdb.com/images/category/side.png';
      break;
    case 'Starter':
      url = 'https://www.themealdb.com/images/category/starter.png';
      break;
    case 'Vegan':
      url = 'https://www.themealdb.com/images/category/vegan.png';
      break;
    case 'Vegetarian':
      url = 'https://www.themealdb.com/images/category/vegetarian.png';
      break;
    default:
      url = 'https://www.themealdb.com/images/category/beef.png';
    }
    return url;
  };

  return (
    <section className="fullSection">
      <h1 className="detailMealsTitle">Details Meals</h1>
      {
        detailsMeals.length > 0
          ? (
            <>
              <div className="detailImg">
                <img
                  src={ detailsMeals[0].strMealThumb }
                  alt={ detailsMeals[0].strMeal }
                  data-testid="recipe-photo"
                />
              </div>
              <div className="itemDetail">
                <div className="itemInfos">
                  <h1 data-testid="recipe-title">{detailsMeals[0].strMeal}</h1>
                  <div className="category">
                    <img
                      src={ setCategory(detailsMeals[0].strCategory) }
                      alt="category"
                    />
                    <p data-testid="recipe-category">{detailsMeals[0].strCategory}</p>
                  </div>
                  <div className="ingredientsList">
                    <h2>Ingredients</h2>
                    <ul>
                      {ingredients.map((ingrediente, index) => {
                        let item = null;
                        if (ingrediente) {
                          item = (
                            <li
                              key={ ingrediente }
                              data-testid={ `${index}-ingredient-name-and-measure` }
                            >
                              {ingrediente}
                              {' '}
                              {medidas[index]}
                            </li>);
                        }
                        return item;
                      })}
                    </ul>
                  </div>
                  <div className="ingredientsList">
                    <h2>Instructions</h2>
                    <p data-testid="instructions">{detailsMeals[0].strInstructions}</p>
                  </div>
                  <div
                    className="react-player"
                  >
                    <h2>Video</h2>
                    <ReactPlayer
                      url={ detailsMeals[0].strYoutube }
                      config={ {
                        youtube: {
                          playerVars: { showinfo: 1 },
                        },
                      } }
                      width="300px"
                      data-testid="video"
                    />
                  </div>
                  <ButtonsFavoriteShare id={ id } type={ detailsMeals } />
                </div>
              </div>

            </>
          )
          : null
      }
      <Recomendations />
      <ButtonStartRecipe url="meals" id={ id } />
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
