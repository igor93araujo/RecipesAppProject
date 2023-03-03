import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './styles.css';

function Footer() {
  const history = useHistory();
  return (
    <div>
      <footer data-testid="footer">
        <button onClick={ () => history.push('/drinks') }>
          <img src={ drinkIcon } alt="drink-icon" data-testid="drinks-bottom-btn" />
        </button>
        <button onClick={ () => history.push('/meals') }>
          <img src={ mealIcon } alt="meal-icon" data-testid="meals-bottom-btn" />
        </button>
      </footer>
    </div>
  );
}

export default Footer;
