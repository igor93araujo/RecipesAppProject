import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppContext } from './AppContext';

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [validaEmail, setValidaEmail] = useState(false);
  const [validaPassword, setValidaPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [visibleSearch, setVisibleSearch] = useState(false);

  const [searchType, setSearchType] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const [mealsArray, setMealsArray] = useState([]);
  const [inicialArray, setInicialArray] = useState([]);
  const [categoryArrayMeals, setCategoryArrayMeals] = useState([]);
  const [categoryArrayDrinks, setCategoryArrayDrinks] = useState([]);
  const [detailsRecipes, setDetailsRecipes] = useState();
  const [isError, setIsError] = useState(false);

  const fetchCategoryMeals = useCallback(async () => {
    const limit = 5;
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const meals = data.meals.slice(0, limit);
    setCategoryArrayMeals(meals);
  }, []);

  const fetchCategoryDrinks = useCallback(async () => {
    const limit = 5;
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const drinks = data.drinks.slice(0, limit);
    setCategoryArrayDrinks(drinks);
  }, []);

  useEffect(() => {
    fetchCategoryMeals();
    fetchCategoryDrinks();
  }, [fetchCategoryMeals, fetchCategoryDrinks]);

  const context = useMemo(
    () => ({
      user,
      setUser,
      validaEmail,
      setValidaEmail,
      validaPassword,
      setValidaPassword,
      buttonDisabled,
      setButtonDisabled,
      visibleSearch,
      setVisibleSearch,
      searchType,
      setSearchType,
      mealsArray,
      setMealsArray,
      searchInput,
      setSearchInput,
      isError,
      setIsError,
      inicialArray,
      setInicialArray,
      categoryArrayMeals,
      setCategoryArrayMeals,
      categoryArrayDrinks,
      setCategoryArrayDrinks,
      detailsRecipes,
      setDetailsRecipes,
    }),
    [
      user,
      setUser,
      validaEmail, setValidaEmail,
      validaPassword, setValidaPassword,
      buttonDisabled, setButtonDisabled,
      visibleSearch,
      setVisibleSearch,
      searchType,
      setSearchType,
      mealsArray,
      setMealsArray,
      searchInput,
      setSearchInput,
      isError,
      setIsError,
      inicialArray,
      setInicialArray,
      categoryArrayMeals,
      setCategoryArrayMeals,
      categoryArrayDrinks,
      setCategoryArrayDrinks,
      detailsRecipes,
      setDetailsRecipes,
    ],
  );

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
