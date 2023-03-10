import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import favoriteBtn from '../images/blackHeartIcon.svg';

const FinishedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

function DoneReceipes() {
  const [filteredRecipes, setFilteredRecipes] = useState([]);

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
    setFilteredRecipes(FinishedRecipes);
  }, []);

  const history = useHistory();

  return (
    <section>
      <Header title="Done Recipes" isIconProfile />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterByAll() }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => filterByMeals() }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterByDrinks() }
      >
        Drinks
      </button>
      {filteredRecipes && filteredRecipes.map((recipe, index) => (
        <div key={ index }>
          <button
            type="button"
            onClick={ () => { history.push(`/${recipe.type}s/${recipe.id}`); } }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
          </button>
          <h3 data-testid={ `${index}-horizontal-top-text` }>
            {recipe.alcoholicOrNot}
          </h3>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <h2
              data-testid={ `${index}-horizontal-name` }
            >
              {`Name: ${recipe.name}`}
            </h2>
          </Link>
          <h3 data-testid={ `${index}-horizontal-top-text` }>
            {`Category-nationality: ${recipe.nationality} - ${recipe.category}`}
          </h3>
          <h3 data-testid={ `${index}-horizontal-done-date` }>
            {`Done in : ${recipe.doneDate}`}
          </h3>
          {
            recipe.type === 'meal' && (
              recipe.tags && recipe.tags.length > 0 && (
                <h3 data-testid={ `${index}-horizontal-tag` }>
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
                </h3>
              )
            )
          }
          <button
            type="button"
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
            />
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            <img
              src={ favoriteBtn }
              alt="favorite"
            />
          </button>
        </div>
      ))}
    </section>
  );
}

export default DoneReceipes;
