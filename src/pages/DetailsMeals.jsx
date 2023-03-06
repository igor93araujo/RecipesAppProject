import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function DetailsMeals({ match: { params: { id } } }) {
  const [detailsMeals, setDetailsMeals] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((respose) => respose.json())
      .then((data) => setDetailsMeals(data.meals));
  }, [id]);

  console.log(detailsMeals);

  return (
    <section>
      <h1>Details Meals</h1>
    </section>
  );
}

DetailsMeals.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
