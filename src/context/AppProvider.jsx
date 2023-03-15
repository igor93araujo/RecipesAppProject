import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
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
  const [isError, setIsError] = useState(false);

  const [finishedRecipes, setFinishedRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')) || [],
  );
  const [detailsRecipes, setDetailsRecipes] = useState();

  const [isLoading, setIsLoading] = useState(false);

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
      finishedRecipes,
      setFinishedRecipes,
      detailsRecipes,
      setDetailsRecipes,
      isLoading,
      setIsLoading,
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
      finishedRecipes,
      setFinishedRecipes,
      detailsRecipes,
      setDetailsRecipes,
      isLoading, setIsLoading,
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
