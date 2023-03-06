import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function DetailsDrinks({ match: { params: { id } } }) {
  const [detailsDrink, setDrinkDetails] = useState(null);

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setDrinkDetails(data.drinks));
  }, [id]);

  console.log(detailsDrink);

  return (
    <section>
      <h1>Details Drinks</h1>
    </section>
  );
}

DetailsDrinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
