import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import favoriteBtn from '../images/blackHeartIcon.svg';

import './style/DoneRecipies.css';

function FavoriteReceipes() {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [verification, setVerification] = useState(false);

  const FinishedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const filterByMeals = () => {
    const meals = FinishedRecipes.filter((recipe) => recipe.type === 'meal');
    setFilteredRecipes(meals);
  };

  const filterByDrinks = () => {
    const drinks = FinishedRecipes.filter((recipe) => recipe.type === 'drink');
    setFilteredRecipes(drinks);
  };

  const filterByAll = () => {
    setFilteredRecipes(FinishedRecipes);
  };

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFilteredRecipes(recipes);
  }, []);

  const disfavorRecipe = (id) => {
    const items = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const index = items.findIndex((item) => item.id === id);
    items.splice(index, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(items));
    const recipies = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(recipies);
    setFilteredRecipes(recipies);
  };

  const history = useHistory();

  return (
    <section>
      <Header title="Favorite Recipes" isIconProfile />
      <nav>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterByAll() }
          className="btn-filter-done"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => filterByMeals() }
          className="btn-filter-done"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterByDrinks() }
          className="btn-filter-done"
        >
          Drinks
        </button>
      </nav>
      <div className="all-recipies-dones">
        {filteredRecipes && filteredRecipes.map((recipe, index) => (
          <div key={ index } className="recipie-done">
            <button
              type="button"
              onClick={ () => { history.push(`/${recipe.type}s/${recipe.id}`); } }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
                className="img-done"
              />
            </button>
            <div className="recipie-done-description">
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <h6
                  data-testid={ `${index}-horizontal-name` }
                >
                  {`Name: ${recipe.name}`}
                </h6>
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
                className="done-category"
              >
                {`Category-nationality: ${recipe.nationality} - ${recipe.category}`}
              </p>
              {
                recipe.doneDate !== undefined
                  && (
                    <p
                      data-testid={ `${index}-horizontal-done-date` }
                      className="recipie-donep"
                    >
                      {`Done in :
                  ${new Date(recipe.doneDate).getDate()}/${new Date(recipe.doneDate)
                      .getMonth() + 1}/${new Date(recipe.doneDate).getFullYear()}`}
                    </p>
                  )

              }
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.alcoholicOrNot}
              </p>
              <div>
                <button
                  type="button"
                  onClick={ () => {
                    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                    setVerification(true);
                  } }
                  className="teste"
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="share"
                  />
                </button>
                <button
                  type="button"
                  onClick={ () => disfavorRecipe(recipe.id) }
                  className="done-btn-favorit"
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ favoriteBtn }
                    alt="favorite"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h4>
        {
          !verification ? '' : 'Link copied!'
        }
      </h4>
    </section>
  );
}

export default FavoriteReceipes;
