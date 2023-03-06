import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

function CategoryList() {
  const { categoryArrayMeals, categoryArrayDrinks } = useContext(AppContext);
  const location = useLocation();

  return (
    <div>
      {location.pathname === '/meals' ? (
        categoryArrayMeals.map((category, index) => (
          <button
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
          >
            {category.strCategory}
          </button>
        ))
      ) : (
        categoryArrayDrinks.map((category, index) => (
          <button
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
          >
            {category.strCategory}
          </button>
        ))
      )}
    </div>
  );
}

export default CategoryList;
