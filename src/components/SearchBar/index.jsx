import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import './styles.css';

export default function SearchBar() {
  const {
    visibleSearch,
    setSearchType,
    searchType,
    setSearchInput,
    setMealsArray,
    searchInput,
  } = useContext(AppContext);

  const handleRadioChange = ({ target }) => {
    const { value } = target;
    setSearchType(value);
  };

  const handleSearchInput = ({ target }) => {
    const { value } = target;
    setSearchInput(value);
  };

  const history = useHistory();

  const fetchData = async () => {
    let endpoint = '';
    if (searchInput !== '' && searchType !== '') {
      if (searchType === 'Ingredient') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      } else if (searchType === 'Name') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
      } else {
        if (searchInput.length > 1) {
          return global.alert('Your search must have only 1 (one) character');
        }
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
      }
    }

    const fetching = await fetch(endpoint);
    const data = await fetching.json();

    if (data.meals === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    if (data.meals.length === 1) {
      return history.push(`/meals/${data.meals[0].idMeal}`);
    }
    setMealsArray(data.meals);
  };

  const fetchDrinks = async () => {
    let endpoint = '';
    if (searchInput !== '' && searchType !== '') {
      if (searchType === 'Ingredient') {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      } else if (searchType === 'Name') {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
      } else {
        if (searchInput.length > 1) {
          return global.alert('Your search must have only 1 (one) character');
        }
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;
      }
    }
    const fetching = await fetch(endpoint);
    const data = await fetching.json();

    if (data.drinks === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    if (data.drinks.length === 1) {
      return history.push(`/drinks/${data.drinks[0].idDrink}`);
    }

    setMealsArray(data);
  };

  const fetchInitialMeals = async () => {
    const fetching = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await fetching.json();
    setMealsArray(data.meals);
  };

  const fetchInitialDrinks = async () => {
    const fetching = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await fetching.json();
    setMealsArray(data.drinks);
  };

  const location = useLocation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInicialPage = () => {
    if (location.pathname === '/meals') {
      return fetchInitialMeals();
    }
    return fetchInitialDrinks();
  };

  useEffect(() => {
    handleInicialPage();
  }, [handleInicialPage]);

  const handleSearchButton = () => {
    if (location.pathname === '/meals') {
      return fetchData();
    }
    return fetchDrinks();
  };

  return (
    <div>
      {
        visibleSearch && (
          <div className="searchContainer">
            <input
              data-testid="search-input"
              type="text"
              placeholder="Buscar Receita"
              className="search-input"
              onChange={ handleSearchInput }
            />
            <div className="radioFilters">
              <div>
                <input
                  type="radio"
                  id="Ingredient"
                  name="radioFilter"
                  value="Ingredient"
                  data-testid="ingredient-search-radio"
                  className="search-radio"
                  onChange={ handleRadioChange }
                />
                <label htmlFor="Ingredient">
                  Ingredient
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Name"
                  name="radioFilter"
                  value="Name"
                  data-testid="name-search-radio"
                  className="search-radio"
                  onChange={ handleRadioChange }
                />
                <label htmlFor="Name">
                  Name
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="firstLetter"
                  name="radioFilter"
                  value="firstLetter"
                  data-testid="first-letter-search-radio"
                  className="search-radio"
                  onChange={ handleRadioChange }
                />
                <label htmlFor="firstLetter">
                  First letter
                </label>
              </div>
            </div>
            <button
              type="button"
              data-testid="exec-search-btn"
              className="search-button"
              onClick={ handleSearchButton }
            >
              Search
            </button>
          </div>
        )
      }
    </div>
  );
}
