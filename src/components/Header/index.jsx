import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ title, isIconProfile, isIconSearch }) {
  const history = useHistory();
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
        <button type="button">
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
