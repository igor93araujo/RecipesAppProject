import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './styles.css';
import { AppContext } from '../../context/AppContext';

function Header({ title, isIconProfile, isIconSearch }) {
  const history = useHistory();
  const { visibleSearch, setVisibleSearch } = useContext(AppContext);

  const handleClick = () => {
    setVisibleSearch(!visibleSearch);
  };
  return (
    <header>
      { isIconProfile && (
        <button
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile icon"
          />
        </button>
      )}
      <h1 data-testid="page-title">{title}</h1>
      { isIconSearch && (
        <button
          type="button"
          onClick={ handleClick }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search icon"
          />
        </button>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isIconProfile: PropTypes.bool.isRequired,
  isIconSearch: PropTypes.bool.isRequired,
};

export default Header;
