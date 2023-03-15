import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import favoriteBtn from '../images/blackHeartIcon.svg';

import './style/DoneRecipies.css';

function DoneReceipes() {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [verification, setVerification] = useState(false);

  const recipiesAll = JSON.parse(localStorage.getItem('doneRecipes'));

  const filterByMeals = () => {
    const meals = recipiesAll.filter((recipe) => recipe.type === 'meal');
    setFilteredRecipes(meals);
  };

  const filterByDrinks = () => {
    const drinks = recipiesAll.filter((recipe) => recipe.type === 'drink');
    setFilteredRecipes(drinks);
  };

  const filterByAll = () => {
    setFilteredRecipes(recipiesAll);
  };

  useEffect(() => {
    const FinishedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setFilteredRecipes(FinishedRecipes);
  }, []);

  const history = useHistory();

  return (
    <section>
      <Header title="Done Recipes" isIconProfile />
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
                style={ { border: 'none', background: 'none', width: '200px' } }
                src={ recipe.image }
                alt={ recipe.name }
                className="img-done"
              />
            </button>
            <div className="recipie-done-description">
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  {`Name: ${recipe.name}`}
                </p>
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` } className="recipie-donep">
                {recipe.alcoholicOrNot}
              </p>
              <p data-testid={ `${index}-horizontal-top-text` } className="done-category">
                {`Category-nationality: ${recipe.nationality} - ${recipe.category}`}
              </p>
              <p
                data-testid={ `${index}-horizontal-done-date` }
                className="recipie-donep"
              >
                {`Done in :
                  ${new Date(recipe.doneDate).getDate()}/${new Date(recipe.doneDate)
            .getMonth() + 1}/${new Date(recipe.doneDate).getFullYear()}`}
              </p>
              {
                recipe.type === 'meal' && (
                  recipe.tags && recipe.tags.length > 0 && (
                    <p
                      data-testid={ `${index}-horizontal-tag` }
                      className="recipie-donep"
                    >
                      {
                        recipe.tags.map((tag, indexTag) => (
                          <span
                            key={ indexTag }
                            data-testid={ `${index}-${tag}-horizontal-tag` }
                          >
                            {tag}
                            {indexTag < recipe.tags.length - 1 && ', '}
                          </span>
                        ))
                      }
                    </p>
                  )
                )
              }
              <div className="buttons-recipies-done">
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
                    className="share-copy"
                  />
                </button>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  className="done-btn-favorit"
                // onClick={ () => disfavorRecipe(recipe.id) }
                >
                  <img
                    src={ favoriteBtn }
                    alt="favorite"
                    className="favorit-done"
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

export default DoneReceipes;
