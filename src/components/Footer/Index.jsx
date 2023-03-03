import React from 'react';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './styles.css';

function Footer() {
  return (
    <div>
      <footer data-testid="footer">
        <button>
          <img src={ drinkIcon } alt="drink-icon" data-testid="drinks-bottom-btn" />
        </button>
        <button>
          <img src={ mealIcon } alt="meal-icon" data-testid="meals-bottom-btn" />
        </button>
      </footer>
    </div>
  );
}

export default Footer;
