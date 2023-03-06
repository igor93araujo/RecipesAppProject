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

  const [isError, setIsError] = useState(false);

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
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
