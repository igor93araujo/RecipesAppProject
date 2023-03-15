import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/icone-perfil.svg';
import './styles.css';
import { AppContext } from '../../context/AppContext';
import appIcon from '../../images/appIcon.png';
import recipesApp from '../../images/recipesApp.svg';
import iconePesquisar from '../../images/iconePesquiar.svg';
import plateIcon from '../../images/icone-prato.svg';

function Header({ title, isIconProfile, isIconSearch = false }) {
  const history = useHistory();
  const { visibleSearch, setVisibleSearch } = useContext(AppContext);

  const redirectProfile = () => {
    history.push('/profile');
  };

  return (
    <>
      <header title="Meals">
        <button
          type="button"
          onClick={ () => history.push('/meals') }
          className="leftElements"
        >
          <img src={ appIcon } alt="icon" className="appIcon" />
          <img src={ recipesApp } alt="title" className="appTitle" />
        </button>

        <div className="rightElements">
          {isIconSearch && (
            <button
              type="button"
              onClick={ () => setVisibleSearch(!visibleSearch) }
            >
              <img
                data-testid="search-top-btn"
                src={ iconePesquisar }
                alt="search icon"
              />
            </button>
          )}
          {isIconProfile && (
            <button
              type="button"
              onClick={ () => redirectProfile() }
            >
              <img
                data-testid="profile-top-btn"
                src={ profileIcon }
                alt="profile icon"
              />
            </button>
          )}
        </div>
      </header>
      <div className="secondContainer">
        <img src={ plateIcon } alt="" />
        <h1 data-testid="page-title">{title}</h1>
      </div>

    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isIconProfile: PropTypes.bool.isRequired,
  isIconSearch: PropTypes.bool,
};

export default Header;
