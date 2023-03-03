import React, { useContext } from 'react';
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

  const fetchData = async () => {
    let endpoint = '';
    if (searchInput !== '' && searchType !== '') {
      if (searchType === 'Ingredient') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      } else if (searchType === 'Name') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
      } else {
        if (searchInput.length > 1) {
          // eslint-disable-next-line no-alert
          return alert('Your search must have only 1 (one) character');
        }
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
      }
    }

    const fetching = await fetch(endpoint);
    const data = await fetching.json();
    setMealsArray(data);
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
              onClick={ fetchData }
            >
              Search
            </button>
          </div>
        )
      }
    </div>
  );
}
